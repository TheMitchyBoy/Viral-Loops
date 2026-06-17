import "server-only";

import { randomUUID } from "node:crypto";
import { prisma } from "../db";
import { getAllPosts, getNewsBySlug, mapPostToNewsItem } from "../posts";
import { NewsItem } from "../types";

import { POST_CATEGORIES } from "./constants";

export { POST_CATEGORIES };

export interface AdminPostInput {
  id?: string;
  slug: string;
  type: "article" | "video";
  tier: "free" | "follow-unlock" | "premium";
  title: string;
  excerpt: string;
  body?: string | null;
  category: string;
  author: string;
  publishedAt: string;
  readTime?: number | null;
  duration?: number | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  tags: string[];
  followerCount?: number;
  viewCount?: number;
  featured?: boolean;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

export function generatePostId(slug: string): string {
  const base = slugify(slug) || "post";
  return `${base}-${randomUUID().slice(0, 8)}`.slice(0, 48);
}

export async function listAdminPosts(): Promise<NewsItem[]> {
  return getAllPosts();
}

export async function getAdminPost(id: string): Promise<AdminPostInput | null> {
  const dbPost = await prisma.post.findUnique({ where: { id } });
  if (dbPost) return dbPostToAdminInput(dbPost);

  const posts = await getAllPosts();
  const merged = posts.find((p) => p.id === id);
  if (!merged) return null;

  return {
    id: merged.id,
    slug: merged.slug,
    type: merged.type,
    tier: merged.tier,
    title: merged.title,
    excerpt: merged.excerpt,
    body: merged.body ?? "",
    category: merged.category,
    author: merged.author,
    publishedAt: merged.publishedAt,
    readTime: merged.readTime ?? null,
    duration: merged.duration ?? null,
    imageUrl: null,
    videoUrl: merged.videoUrl ?? null,
    tags: merged.tags,
    followerCount: merged.followerCount,
    viewCount: merged.viewCount,
    featured: false,
  };
}

function dbPostToAdminInput(post: {
  id: string;
  slug: string;
  type: string;
  tier: string;
  title: string;
  excerpt: string;
  body: string | null;
  category: string;
  author: string;
  publishedAt: Date;
  readTime: number | null;
  duration: number | null;
  imageUrl: string | null;
  videoUrl: string | null;
  tags: string;
  followerCount: number;
  viewCount: number;
  featured: boolean;
}): AdminPostInput {
  let tags: string[] = [];
  try {
    const parsed = JSON.parse(post.tags) as unknown;
    tags = Array.isArray(parsed) ? parsed.filter((t): t is string => typeof t === "string") : [];
  } catch {
    tags = [];
  }

  return {
    id: post.id,
    slug: post.slug,
    type: post.type as AdminPostInput["type"],
    tier: post.tier as AdminPostInput["tier"],
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    category: post.category,
    author: post.author,
    publishedAt: post.publishedAt.toISOString(),
    readTime: post.readTime,
    duration: post.duration,
    imageUrl: post.imageUrl,
    videoUrl: post.videoUrl,
    tags,
    followerCount: post.followerCount,
    viewCount: post.viewCount,
    featured: post.featured,
  };
}

export async function getAdminPostBySlug(slug: string): Promise<NewsItem | undefined> {
  return getNewsBySlug(slug);
}

export async function upsertAdminPost(input: AdminPostInput): Promise<NewsItem> {
  const id = input.id?.trim() || generatePostId(input.slug);
  const slug = input.slug.trim();

  const existingSlug = await prisma.post.findUnique({ where: { slug } });
  if (existingSlug && existingSlug.id !== id) {
    throw new Error("Another post already uses this slug.");
  }

  const data = {
    id,
    slug,
    type: input.type,
    tier: input.tier,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    body: input.body?.trim() || null,
    category: input.category,
    author: input.author.trim() || "Mitchel Turner",
    publishedAt: new Date(input.publishedAt),
    readTime: input.readTime ?? null,
    duration: input.duration ?? null,
    imageUrl: input.imageUrl?.trim() || null,
    videoUrl: input.videoUrl?.trim() || null,
    tags: JSON.stringify(input.tags.filter(Boolean)),
    followerCount: input.followerCount ?? 0,
    viewCount: input.viewCount ?? 0,
    featured: input.featured ?? false,
  };

  const post = await prisma.post.upsert({
    where: { id },
    update: data,
    create: data,
  });

  return mapPostToNewsItem(post);
}

export async function deleteAdminPost(id: string): Promise<void> {
  await prisma.post.delete({ where: { id } });
}
