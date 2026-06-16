import { NEWS_ITEMS, getFeaturedNews, getTrendingNews, LEADERBOARD } from "@/lib/data";
import NewsCard from "@/components/NewsCard";
import ViralLoopBanner from "@/components/ViralLoopBanner";
import { TrendingUp, Trophy, Flame } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedNews();
  const trending = getTrendingNews();
  const categories = [...new Set(NEWS_ITEMS.map((n) => n.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero featured story */}
      <section className="mb-10">
        <NewsCard item={featured[0]} variant="featured" />
      </section>

      {/* Viral loop explainer */}
      <ViralLoopBanner />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content grid */}
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

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Trending */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-stone-900">Most Shared</h3>
            </div>
            {trending.map((item) => (
              <NewsCard key={item.id} item={item} variant="compact" />
            ))}
          </div>

          {/* Leaderboard preview */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-stone-900">Top Sharers</h3>
            </div>
            <div className="space-y-3">
              {LEADERBOARD.slice(0, 5).map((entry) => (
                <div key={entry.rank} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-stone-400 w-5">{entry.rank}</span>
                  <span className="text-lg">{entry.badge}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-stone-900 truncate">{entry.name}</div>
                    <div className="text-xs text-stone-400">{entry.points.toLocaleString()} pts</div>
                  </div>
                  <div className="text-xs text-stone-400">{entry.shares} shares</div>
                </div>
              ))}
            </div>
            <Link
              href="/rewards#leaderboard"
              className="block text-center text-sm text-brand-600 font-medium mt-4 hover:underline"
            >
              View full leaderboard →
            </Link>
          </div>

          {/* Share streak CTA */}
          <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5" />
              <h3 className="font-bold">Start Your Share Streak</h3>
            </div>
            <p className="text-sm text-brand-100 mb-4">
              Share stories daily to build your streak and earn bonus badges. 3-day streaks unlock special rewards!
            </p>
            <Link
              href="/rewards"
              className="block text-center bg-white text-brand-700 font-semibold py-2 rounded-lg text-sm hover:bg-brand-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
