import { notFound } from "next/navigation";
import { getNewsBySlug, NEWS_ITEMS } from "@/lib/data";
import ArticleClient from "./ArticleClient";

export function generateStaticParams() {
  return NEWS_ITEMS.filter((n) => n.type === "article").map((n) => ({ slug: n.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article || article.type !== "article") notFound();
  return <ArticleClient article={article} />;
}
