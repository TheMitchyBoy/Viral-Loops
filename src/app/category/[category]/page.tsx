import { notFound } from "next/navigation";
import { getNewsByCategory, getCategories } from "@/lib/posts";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.toLowerCase() }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const items = await getNewsByCategory(category);

  if (items.length === 0) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-cyan-400 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <p className="label-caps text-cyan-400/70 mb-2">Category</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 tracking-tight">{normalizedCategory}</h1>
      <p className="text-zinc-500 mb-8">
        {items.length} {items.length === 1 ? "story" : "stories"} · Follow on Facebook to unlock exclusive content
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
