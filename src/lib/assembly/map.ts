import { NewsItem } from "../types";
import { resolvePostImage } from "../placeholders";
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
  if (row.summary?.trim()) return row.summary.trim();
  const plain = row.content.replace(/[#*_`>\[\]()]/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > 220 ? `${plain.slice(0, 217)}...` : plain;
}

export function mapAssemblyPostToNewsItem(row: AssemblyBlogPost): NewsItem {
  return {
    id: `assembly-${row.source_entry_id}`,
    slug: row.slug,
    type: "article",
    tier: "free",
    title: row.title,
    excerpt: excerptFrom(row),
    body: row.content,
    category: "Politics",
    author: "Mitchel Turner",
    publishedAt: parsePublishedAt(row.meeting_date, row.created_at),
    readTime: estimateReadTime(row.content),
    imageUrl: resolvePostImage(null, "Politics"),
    tags: ["politics", "assembly", "borough"],
    followerCount: 0,
    viewCount: 0,
  };
}
