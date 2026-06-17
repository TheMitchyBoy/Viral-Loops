import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import initSqlJs from "sql.js";
import { NewsItem } from "../types";
import { getAssemblyDatabaseUrl, isPostgresUrl, looksLikePlaceholderUrl } from "./config";
import { mapAssemblyPostToNewsItem } from "./map";
import { AssemblyBlogPost } from "./types";

const ASSEMBLY_QUERY = `
  SELECT source_entry_id, title, slug, summary, content, meeting_date, source_url, created_at
  FROM blog_posts
  WHERE published = true
  ORDER BY created_at DESC
`;

const ASSEMBLY_QUERY_BY_SLUG = `
  SELECT source_entry_id, title, slug, summary, content, meeting_date, source_url, created_at
  FROM blog_posts
  WHERE published = true AND slug = $1
  LIMIT 1
`;

let pgPool: pg.Pool | undefined;
let cache: { posts: NewsItem[]; expiresAt: number } | undefined;
const CACHE_TTL_MS = 60_000;

function getPgPool(url: string): pg.Pool {
  if (!pgPool) {
    const useSsl = !/localhost|127\.0\.0\.1/.test(url);
    pgPool = new pg.Pool({
      connectionString: url,
      ssl: useSsl ? { rejectUnauthorized: false } : undefined,
      max: 4,
    });
  }
  return pgPool;
}

function resolveSqlitePath(url: string): string {
  if (url.startsWith("file:")) {
    const relative = url.slice("file:".length).replace(/^\.\//, "");
    return path.isAbsolute(relative) ? relative : path.join(process.cwd(), relative);
  }

  const withoutScheme = url.replace(/^sqlite:\/\//, "");
  const normalized = withoutScheme.startsWith("/") ? withoutScheme : `/${withoutScheme}`;
  return path.normalize(normalized);
}

async function fetchRowsFromPostgres(url: string, slug?: string): Promise<AssemblyBlogPost[]> {
  const pool = getPgPool(url);
  const result = slug
    ? await pool.query<AssemblyBlogPost>(ASSEMBLY_QUERY_BY_SLUG, [slug])
    : await pool.query<AssemblyBlogPost>(ASSEMBLY_QUERY);
  return result.rows;
}

async function fetchRowsFromSqlite(url: string, slug?: string): Promise<AssemblyBlogPost[]> {
  const dbPath = resolveSqlitePath(url);
  if (!fs.existsSync(dbPath)) {
    console.warn(`Assembly SQLite database not found at ${dbPath}`);
    return [];
  }

  const SQL = await initSqlJs();
  const buffer = fs.readFileSync(dbPath);
  const db = new SQL.Database(buffer);

  try {
    const query = slug
      ? `SELECT source_entry_id, title, slug, summary, content, meeting_date, source_url, created_at
         FROM blog_posts WHERE published = 1 AND slug = '${slug.replace(/'/g, "''")}' LIMIT 1`
      : ASSEMBLY_QUERY.replace("published = true", "published = 1");

    const results = db.exec(query);
    if (results.length === 0) return [];

    const { columns, values } = results[0];
    return values.map((row: unknown[]) => {
      const record: Record<string, unknown> = {};
      columns.forEach((col: string, i: number) => {
        record[col] = row[i];
      });
      return record as unknown as AssemblyBlogPost;
    });
  } finally {
    db.close();
  }
}

async function fetchAssemblyRows(slug?: string): Promise<AssemblyBlogPost[]> {
  const url = getAssemblyDatabaseUrl();
  if (!url) return [];

  if (isPostgresUrl(url)) {
    return fetchRowsFromPostgres(url, slug);
  }

  return fetchRowsFromSqlite(url, slug);
}

export async function fetchAssemblyNewsItems(): Promise<NewsItem[]> {
  const url = getAssemblyDatabaseUrl();
  if (!url) return [];

  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return cache.posts;
  }

  try {
    const rows = await fetchAssemblyRows();
    const posts = rows.map(mapAssemblyPostToNewsItem);

    if (process.env.NODE_ENV === "development") {
      console.log(`[assembly] Loaded ${posts.length} post(s) from Assembly-Scrape`);
    }

    cache = { posts, expiresAt: now + CACHE_TTL_MS };
    return posts;
  } catch (error) {
    console.warn("[assembly] Failed to load posts from Assembly-Scrape:", error);
    return cache?.posts ?? [];
  }
}

export async function fetchAssemblyNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const url = getAssemblyDatabaseUrl();
  if (!url) return undefined;

  try {
    const rows = await fetchAssemblyRows(slug);
    const row = rows[0];
    return row ? mapAssemblyPostToNewsItem(row) : undefined;
  } catch (error) {
    console.warn(`[assembly] Failed to load slug "${slug}":`, error);
    return undefined;
  }
}

export interface AssemblyConnectionStatus {
  configured: boolean;
  placeholder: boolean;
  connected: boolean;
  publishedCount: number;
  totalCount: number;
  recentPosts: Array<{ title: string; slug: string }>;
  error?: string;
  hint?: string;
}

function maskDatabaseHost(url: string): string {
  try {
    const parsed = new URL(url.replace(/^postgres(ql)?:/, "postgresql:"));
    return `${parsed.protocol}//***@${parsed.hostname}${parsed.port ? `:${parsed.port}` : ""}${parsed.pathname}`;
  } catch {
    return "(invalid url)";
  }
}

async function fetchAssemblyCounts(url: string): Promise<{ published: number; total: number }> {
  if (isPostgresUrl(url)) {
    const pool = getPgPool(url);
    const result = await pool.query<{ published: string; total: string }>(`
      SELECT
        COUNT(*) FILTER (WHERE published = true)::text AS published,
        COUNT(*)::text AS total
      FROM blog_posts
    `);
    const row = result.rows[0];
    return { published: Number(row?.published ?? 0), total: Number(row?.total ?? 0) };
  }

  const dbPath = resolveSqlitePath(url);
  if (!fs.existsSync(dbPath)) return { published: 0, total: 0 };

  const SQL = await initSqlJs();
  const db = new SQL.Database(fs.readFileSync(dbPath));
  try {
    const published = db.exec("SELECT COUNT(*) FROM blog_posts WHERE published = 1");
    const total = db.exec("SELECT COUNT(*) FROM blog_posts");
    return {
      published: Number(published[0]?.values[0]?.[0] ?? 0),
      total: Number(total[0]?.values[0]?.[0] ?? 0),
    };
  } finally {
    db.close();
  }
}

/** Diagnostic helper for deploy debugging (no Python required). */
export async function getAssemblyConnectionStatus(): Promise<AssemblyConnectionStatus> {
  const rawUrl = process.env.ASSEMBLY_DATABASE_URL?.trim();
  if (!rawUrl) {
    return {
      configured: false,
      placeholder: false,
      connected: false,
      publishedCount: 0,
      totalCount: 0,
      recentPosts: [],
      hint: "Set ASSEMBLY_DATABASE_URL to your Assembly-Scrape Postgres URL on this service.",
    };
  }

  if (looksLikePlaceholderUrl(rawUrl)) {
    return {
      configured: true,
      placeholder: true,
      connected: false,
      publishedCount: 0,
      totalCount: 0,
      recentPosts: [],
      error: "ASSEMBLY_DATABASE_URL is still a placeholder",
      hint: `Replace with the real Postgres URL from your Assembly-Scrape Railway service. Current: ${maskDatabaseHost(rawUrl)}`,
    };
  }

  try {
    const [counts, rows] = await Promise.all([
      fetchAssemblyCounts(rawUrl),
      fetchAssemblyRows(),
    ]);

    return {
      configured: true,
      placeholder: false,
      connected: true,
      publishedCount: counts.published,
      totalCount: counts.total,
      recentPosts: rows.slice(0, 5).map((row) => ({ title: row.title, slug: row.slug })),
      hint:
        counts.published === 0
          ? "Connected but no published blog_posts. Run the Assembly-Scrape bot in its own Railway service."
          : undefined,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isPlaceholderHost = /ENOTFOUND HOST\.railway\.internal/i.test(message);
    return {
      configured: true,
      placeholder: isPlaceholderHost,
      connected: false,
      publishedCount: 0,
      totalCount: 0,
      recentPosts: [],
      error: message,
      hint: isPlaceholderHost
        ? "You copied the docs example literally — replace HOST.railway.internal with the real hostname from Railway → Assembly-Scrape Postgres → Connect → copy DATABASE_URL in full."
        : `Could not reach ${maskDatabaseHost(rawUrl)}. Copy the full DATABASE_URL from Assembly-Scrape Postgres (not a template). If services are in different Railway projects, use the public Postgres URL (*.proxy.rlwy.net), not .railway.internal.`,
    };
  }
}
