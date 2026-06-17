import { NewsItem } from "../types";
import { resolveThemedPostImage } from "../placeholders";
import { AssemblyBlogPost } from "./types";

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parsePublishedAt(meetingDate: string | null, createdAt: string): string {
  if (meetingDate) {
    const parsed = new Date(meetingDate);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  const created = new Date(createdAt);
  return Number.isNaN(created.getTime()) ? new Date().toISOString() : created.toISOString();
}

function excerptFrom(row: AssemblyBlogPost): string {
  const content = row.content ?? "";
  if (row.summary?.trim()) return row.summary.trim();
  const plain = content.replace(/[#*_`>\[\]()]/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > 220 ? `${plain.slice(0, 217)}...` : plain || row.title;
}

export function mapAssemblyPostToNewsItem(row: AssemblyBlogPost): NewsItem {
  const content = row.content ?? "";
  const createdAt =
    row.created_at instanceof Date
      ? row.created_at.toISOString()
      : String(row.created_at ?? new Date().toISOString());

  return {
    id: `assembly-${row.source_entry_id}`,
    slug: row.slug,
    type: "article",
    tier: "free",
    title: row.title,
    excerpt: excerptFrom(row),
    body: content,
    category: "Politics",
    author: "Mitchel Turner",
    publishedAt: parsePublishedAt(row.meeting_date, createdAt),
    readTime: estimateReadTime(content || row.title),
    imageUrl: resolveThemedPostImage({
      category: "Politics",
      title: row.title,
      slug: row.slug,
      excerpt: excerptFrom(row),
      tags: ["politics", "assembly", "borough"],
    }),
    tags: ["politics", "assembly", "borough"],
    followerCount: 0,
    viewCount: 0,
  };
}
