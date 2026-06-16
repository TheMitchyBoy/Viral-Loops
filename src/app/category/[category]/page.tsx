import { notFound } from "next/navigation";
import { NEWS_ITEMS } from "@/lib/data";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  const categories = [...new Set(NEWS_ITEMS.map((n) => n.category.toLowerCase()))];
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const items = NEWS_ITEMS.filter(
    (n) => n.category.toLowerCase() === category.toLowerCase()
  );

  if (items.length === 0) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-brand-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">{normalizedCategory}</h1>
      <p className="text-stone-500 mb-8">
        {items.length} {items.length === 1 ? "story" : "stories"} · Follow on Facebook to unlock exclusive content
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
