import "server-only";

import { Post as DbPost, BonusContent as DbBonus } from "@prisma/client";
import { prisma } from "./db";
import { NewsItem, BonusContent, ContentTier, ContentType } from "./types";
import { resolveThemedPostImage } from "./placeholders";
import { fetchAssemblyNewsBySlug, fetchAssemblyNewsItems } from "./assembly/fetch";

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
    imageUrl: resolveThemedPostImage({
      imageUrl: post.imageUrl,
      category: post.category,
      title: post.title,
      excerpt: post.excerpt,
      tags: parseTags(post.tags),
      slug: post.slug,
    }),
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

async function getLocalPosts(): Promise<NewsItem[]> {
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
  return posts.map(mapPostToNewsItem);
}

/** Merge curated local posts with live Assembly-Scrape articles (assembly wins on slug collision). */
async function getMergedPosts(): Promise<NewsItem[]> {
  const [local, assembly] = await Promise.all([getLocalPosts(), fetchAssemblyNewsItems()]);
  const bySlug = new Map<string, NewsItem>();

  for (const item of local) bySlug.set(item.slug, item);
  for (const item of assembly) bySlug.set(item.slug, item);

  return [...bySlug.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function isAssemblyPost(item: NewsItem): boolean {
  return item.id.startsWith("assembly-");
}

export async function getAssemblyPosts(): Promise<NewsItem[]> {
  const posts = await getMergedPosts();
  return posts.filter(isAssemblyPost);
}

export async function getCuratedPosts(): Promise<NewsItem[]> {
  const posts = await getMergedPosts();
  return posts.filter((p) => !isAssemblyPost(p));
}

export async function getAllPosts(): Promise<NewsItem[]> {
  return getMergedPosts();
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const assembly = await fetchAssemblyNewsBySlug(slug);
  if (assembly) return assembly;

  const post = await prisma.post.findUnique({ where: { slug } });
  return post ? mapPostToNewsItem(post) : undefined;
}

export async function getFeaturedNews(): Promise<NewsItem[]> {
  const assembly = await getAssemblyPosts();
  if (assembly.length > 0) return assembly.slice(0, 3);

  const prismaFeatured = await prisma.post.findMany({
    where: { featured: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const posts = await getMergedPosts();

  if (prismaFeatured.length > 0) {
    const featuredSlugs = new Set(prismaFeatured.map((p) => p.slug));
    const featured = posts.filter((p) => featuredSlugs.has(p.slug));
    if (featured.length > 0) return featured.slice(0, 3);
  }

  return posts.slice(0, 3);
}

export async function getTrendingNews(): Promise<NewsItem[]> {
  const assembly = await getAssemblyPosts();
  if (assembly.length > 0) return assembly.slice(0, 5);

  const posts = await getMergedPosts();
  return [...posts].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
}

export async function getNewsByCategory(category: string): Promise<NewsItem[]> {
  const posts = await getMergedPosts();
  return posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getArticleSlugs(): Promise<string[]> {
  const posts = await getMergedPosts();
  return posts.filter((p) => p.type === "article").map((p) => p.slug);
}

export async function getVideoSlugs(): Promise<string[]> {
  const posts = await getMergedPosts();
  return posts.filter((p) => p.type === "video").map((p) => p.slug);
}

export async function getCategories(): Promise<string[]> {
  const posts = await getMergedPosts();
  return [...new Set(posts.map((p) => p.category))];
}

export async function getLockedContentCount(): Promise<number> {
  const posts = await getMergedPosts();
  return posts.filter((p) => p.tier !== "free").length;
}

export async function getBonusForContent(contentId: string): Promise<BonusContent[]> {
  const bonuses = await prisma.bonusContent.findMany({ where: { parentId: contentId } });
  return bonuses.map(mapBonus);
}

export async function getExclusivePosts(): Promise<NewsItem[]> {
  const posts = await getMergedPosts();
  return posts.filter((p) => p.tier !== "free");
}
