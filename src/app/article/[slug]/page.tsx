import { notFound } from "next/navigation";
import { getNewsBySlug, getArticleSlugs, getBonusForContent } from "@/lib/data";
import ArticleClient from "./ArticleClient";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article || article.type !== "article") notFound();

  const bonuses = await getBonusForContent(article.id);

  return <ArticleClient article={article} bonuses={bonuses} />;
}
