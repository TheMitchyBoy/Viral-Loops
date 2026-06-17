/**
 * Sync published blog_posts from Assembly-Scrape into the local Prisma Post table.
 * Set ASSEMBLY_DATABASE_URL to a PostgreSQL or SQLite URL from Assembly-Scrape.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import pg from "pg";
import initSqlJs from "sql.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

interface AssemblyBlogPost {
  source_entry_id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  meeting_date: string | null;
  source_url: string | null;
  created_at: string;
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parsePublishedAt(meetingDate: string | null, createdAt: string): Date {
  if (meetingDate) {
    const parsed = new Date(meetingDate);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  const created = new Date(createdAt);
  return Number.isNaN(created.getTime()) ? new Date() : created;
}

function excerptFrom(row: AssemblyBlogPost): string {
  if (row.summary?.trim()) return row.summary.trim();
  const plain = row.content.replace(/[#*_`>\[\]()]/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > 220 ? `${plain.slice(0, 217)}...` : plain;
}

function resolveSqlitePath(url: string): string {
  if (url.startsWith("file:")) {
    const relative = url.slice("file:".length).replace(/^\.\//, "");
    return path.isAbsolute(relative) ? relative : path.join(root, relative);
  }

  // sqlite:///./data/db.sqlite or sqlite:////absolute/path
  const withoutScheme = url.replace(/^sqlite:\/\//, "");
  const normalized = withoutScheme.startsWith("/") ? withoutScheme : `/${withoutScheme}`;
  return path.normalize(normalized);
}

function isPostgresUrl(url: string): boolean {
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

/** Skip example/placeholder URLs copied from docs without a real host. */
function looksLikePlaceholderUrl(url: string): boolean {
  if (/user:pass@host/i.test(url)) return true;
  if (/@host(?:[:/]|$)/i.test(url)) return true;
  if (/example\.com/i.test(url)) return true;

  try {
    const parsed = new URL(url.replace(/^postgres(ql)?:/, "postgresql:"));
    const hostname = parsed.hostname.toLowerCase();
    if (!hostname || hostname === "host" || hostname === "localhost.example") return true;
  } catch {
    return false;
  }

  return false;
}

async function fetchFromPostgres(url: string): Promise<AssemblyBlogPost[]> {
  const useSsl = !/localhost|127\.0\.0\.1/.test(url);
  const client = new pg.Client({
    connectionString: url,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  });

  await client.connect();
  try {
    const result = await client.query<AssemblyBlogPost>(`
      SELECT source_entry_id, title, slug, summary, content, meeting_date, source_url, created_at
      FROM blog_posts
      WHERE published = true
      ORDER BY created_at DESC
    `);
    return result.rows;
  } finally {
    await client.end();
  }
}

async function fetchFromSqlite(dbPath: string): Promise<AssemblyBlogPost[]> {
  const SQL = await initSqlJs();
  const buffer = fs.readFileSync(dbPath);
  const db = new SQL.Database(buffer);

  try {
    const results = db.exec(`
      SELECT source_entry_id, title, slug, summary, content, meeting_date, source_url, created_at
      FROM blog_posts
      WHERE published = 1
      ORDER BY created_at DESC
    `);

    if (results.length === 0) return [];

    const { columns, values } = results[0];
    return values.map((row) => {
      const record: Record<string, unknown> = {};
      columns.forEach((col, i) => {
        record[col] = row[i];
      });
      return record as unknown as AssemblyBlogPost;
    });
  } finally {
    db.close();
  }
}

async function fetchAssemblyPosts(url: string): Promise<AssemblyBlogPost[]> {
  if (isPostgresUrl(url)) {
    return fetchFromPostgres(url);
  }

  const dbPath = resolveSqlitePath(url);
  if (!fs.existsSync(dbPath)) {
    console.warn(`Assembly SQLite database not found at ${dbPath} — skipping sync.`);
    return [];
  }

  return fetchFromSqlite(dbPath);
}

async function main() {
  const url = process.env.ASSEMBLY_DATABASE_URL?.trim();
  if (!url) {
    console.log("ASSEMBLY_DATABASE_URL not set — skipping assembly post sync.");
    return;
  }

  if (looksLikePlaceholderUrl(url)) {
    console.warn(
      "ASSEMBLY_DATABASE_URL looks like a placeholder — skipping assembly post sync. Set a real Assembly-Scrape database URL to sync live articles.",
    );
    return;
  }

  console.log("Syncing assembly posts...");
  let rows: AssemblyBlogPost[];

  try {
    rows = await fetchAssemblyPosts(url);
  } catch (error) {
    console.warn("Assembly post sync failed (build continues with seeded posts):", error);
    return;
  }

  if (rows.length === 0) {
    console.log("No published assembly posts found.");
    return;
  }

  const prisma = new PrismaClient();

  try {
    for (const row of rows) {
      const post = {
        id: `assembly-${row.source_entry_id}`,
        slug: row.slug,
        type: "article" as const,
        tier: "free" as const,
        title: row.title,
        excerpt: excerptFrom(row),
        body: row.content,
        category: "Politics",
        author: "Mitchel Turner",
        publishedAt: parsePublishedAt(row.meeting_date, row.created_at),
        readTime: estimateReadTime(row.content),
        imageUrl: null,
        tags: JSON.stringify(["politics", "assembly", "borough"]),
        followerCount: 0,
        viewCount: 0,
        featured: false,
      };

      await prisma.post.upsert({
        where: { id: post.id },
        update: post,
        create: post,
      });
    }

    console.log(`Synced ${rows.length} assembly post(s) from Assembly-Scrape.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.warn("Assembly post sync failed (build continues with seeded posts):", error);
});
