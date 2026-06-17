/**
 * Sync published blog_posts from Assembly-Scrape into the local Prisma Post table.
 * Runtime reads also pull directly from Assembly-Scrape when ASSEMBLY_DATABASE_URL is set.
 */

import { PrismaClient } from "@prisma/client";
import { getAssemblyDatabaseUrl } from "../src/lib/assembly/config";
import { mapAssemblyPostToNewsItem } from "../src/lib/assembly/map";
import type { AssemblyBlogPost } from "../src/lib/assembly/types";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import initSqlJs from "sql.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function isPostgresUrl(url: string): boolean {
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

function resolveSqlitePath(url: string): string {
  if (url.startsWith("file:")) {
    const relative = url.slice("file:".length).replace(/^\.\//, "");
    return path.isAbsolute(relative) ? relative : path.join(root, relative);
  }

  const withoutScheme = url.replace(/^sqlite:\/\//, "");
  const normalized = withoutScheme.startsWith("/") ? withoutScheme : `/${withoutScheme}`;
  return path.normalize(normalized);
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

async function fetchAssemblyRows(url: string): Promise<AssemblyBlogPost[]> {
  if (isPostgresUrl(url)) return fetchFromPostgres(url);

  const dbPath = resolveSqlitePath(url);
  if (!fs.existsSync(dbPath)) {
    console.warn(`Assembly SQLite database not found at ${dbPath} — skipping sync.`);
    return [];
  }

  return fetchFromSqlite(dbPath);
}

async function main() {
  const url = getAssemblyDatabaseUrl();
  if (!url) {
    console.log("ASSEMBLY_DATABASE_URL not set — skipping assembly post sync.");
    return;
  }

  console.log("Syncing assembly posts...");
  let rows: AssemblyBlogPost[];

  try {
    rows = await fetchAssemblyRows(url);
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
      const mapped = mapAssemblyPostToNewsItem(row);
      const post = {
        id: mapped.id,
        slug: mapped.slug,
        type: mapped.type,
        tier: mapped.tier,
        title: mapped.title,
        excerpt: mapped.excerpt,
        body: mapped.body ?? null,
        category: mapped.category,
        author: mapped.author,
        publishedAt: new Date(mapped.publishedAt),
        readTime: mapped.readTime ?? null,
        imageUrl: null,
        tags: JSON.stringify(mapped.tags),
        followerCount: mapped.followerCount,
        viewCount: mapped.viewCount,
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
