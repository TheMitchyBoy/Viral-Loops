import "server-only";

import { Post as DbPost, BonusContent as DbBonus } from "@prisma/client";
import { prisma } from "./db";
import { NewsItem, BonusContent, ContentTier, ContentType } from "./types";
import { resolvePostImage } from "./placeholders";

function parseTags(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((t): t is string => typeof t === "string") : [];
  } catch {
    return [];
  }
}

export function mapPostToNewsItem(post: DbPost): NewsItem {
  return {
    id: post.id,
    slug: post.slug,
    type: post.type as ContentType,
    tier: post.tier as ContentTier,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body ?? undefined,
    category: post.category,
    author: post.author,
    publishedAt: post.publishedAt.toISOString(),
    readTime: post.readTime ?? undefined,
    duration: post.duration ?? undefined,
    imageUrl: resolvePostImage(post.imageUrl, post.category),
    videoUrl: post.videoUrl ?? undefined,
    tags: parseTags(post.tags),
    followerCount: post.followerCount,
    viewCount: post.viewCount,
  };
}

function mapBonus(bonus: DbBonus): BonusContent {
  return {
    id: bonus.id,
    parentId: bonus.parentId,
    title: bonus.title,
    description: bonus.description,
    type: bonus.type as BonusContent["type"],
    content: bonus.content,
  };
}

export async function getAllPosts(): Promise<NewsItem[]> {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return posts.map(mapPostToNewsItem);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const post = await prisma.post.findUnique({ where: { slug } });
  return post ? mapPostToNewsItem(post) : undefined;
}

export async function getFeaturedNews(): Promise<NewsItem[]> {
  const posts = await prisma.post.findMany({
    where: { featured: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
  if (posts.length > 0) return posts.map(mapPostToNewsItem);
  const fallback = await prisma.post.findMany({ orderBy: { publishedAt: "desc" }, take: 3 });
  return fallback.map(mapPostToNewsItem);
}

export async function getTrendingNews(): Promise<NewsItem[]> {
  const posts = await prisma.post.findMany({
    orderBy: { viewCount: "desc" },
    take: 5,
  });
  return posts.map(mapPostToNewsItem);
}

export async function getNewsByCategory(category: string): Promise<NewsItem[]> {
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
  return posts
    .filter((p) => p.category.toLowerCase() === category.toLowerCase())
    .map(mapPostToNewsItem);
}

export async function getArticleSlugs(): Promise<string[]> {
  const posts = await prisma.post.findMany({
    where: { type: "article" },
    select: { slug: true },
  });
  return posts.map((p) => p.slug);
}

export async function getVideoSlugs(): Promise<string[]> {
  const posts = await prisma.post.findMany({
    where: { type: "video" },
    select: { slug: true },
  });
  return posts.map((p) => p.slug);
}

export async function getCategories(): Promise<string[]> {
  const rows = await prisma.post.findMany({ select: { category: true }, distinct: ["category"] });
  return rows.map((r) => r.category);
}

export async function getLockedContentCount(): Promise<number> {
  return prisma.post.count({ where: { tier: { not: "free" } } });
}

export async function getBonusForContent(contentId: string): Promise<BonusContent[]> {
  const bonuses = await prisma.bonusContent.findMany({ where: { parentId: contentId } });
  return bonuses.map(mapBonus);
}

export async function getExclusivePosts(): Promise<NewsItem[]> {
  const posts = await prisma.post.findMany({
    where: { tier: { not: "free" } },
    orderBy: { publishedAt: "desc" },
  });
  return posts.map(mapPostToNewsItem);
}
