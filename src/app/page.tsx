import { NEWS_ITEMS, getFeaturedNews, getTrendingNews, COMMUNITY_HIGHLIGHTS, getLockedContentCount } from "@/lib/data";
import NewsCard from "@/components/NewsCard";
import ViralLoopBanner from "@/components/ViralLoopBanner";
import { TrendingUp, Facebook, Lock, Sparkles } from "lucide-react";
import RecruitmentBar from "@/components/viral/RecruitmentBar";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedNews();
  const trending = getTrendingNews();
  const categories = [...new Set(NEWS_ITEMS.map((n) => n.category))];
  const lockedCount = getLockedContentCount();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="mb-10">
        <NewsCard item={featured[0]} variant="featured" />
      </section>

      <ViralLoopBanner />

      <div className="mb-8 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecruitmentBar />
        </div>
        <Link
          href="/loops"
          className="flex items-center justify-center gap-2 bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-xl p-5 font-semibold hover:from-brand-500 hover:to-brand-600 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          Explore All 12 Viral Loops →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-stone-900">Latest News</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="text-xs font-medium text-stone-500 hover:text-brand-600 bg-stone-100 px-2.5 py-1 rounded-full transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {NEWS_ITEMS.slice(1).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <aside className="space-y-8">
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-stone-900">Trending Now</h3>
            </div>
            {trending.map((item) => (
              <NewsCard key={item.id} item={item} variant="compact" />
            ))}
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-stone-900">Exclusive Content</h3>
            </div>
            <p className="text-sm text-stone-500 mb-4">
              {lockedCount} exclusive stories and videos available when you follow on Facebook.
            </p>
            <ul className="space-y-2 text-sm text-stone-600 mb-4">
              {NEWS_ITEMS.filter((n) => n.tier !== "free")
                .slice(0, 3)
                .map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <Lock className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="line-clamp-2">{item.title}</span>
                  </li>
                ))}
            </ul>
            <Link
              href="/rewards"
              className="block text-center text-sm text-blue-600 font-medium hover:underline"
            >
              See all unlocked content →
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Facebook className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-stone-900">Community</h3>
            </div>
            <div className="space-y-3">
              {COMMUNITY_HIGHLIGHTS.slice(0, 5).map((entry) => (
                <div key={entry.rank} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-stone-400 w-5">{entry.rank}</span>
                  <span className="text-lg">{entry.badge}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-stone-900 truncate">{entry.name}</div>
                    <div className="text-xs text-stone-400">{entry.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1877F2] to-blue-700 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Facebook className="w-5 h-5" />
              <h3 className="font-bold">Unlock Everything</h3>
            </div>
            <p className="text-sm text-blue-100 mb-4">
              One Facebook follow gives you access to all exclusive investigations, bonus videos, and insider previews.
            </p>
            <Link
              href="/rewards"
              className="block text-center bg-white text-blue-700 font-semibold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
