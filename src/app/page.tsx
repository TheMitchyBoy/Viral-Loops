import { getFeaturedNews, getTrendingNews, getAllPosts, getCategories, getLockedContentCount } from "@/lib/data";
import NewsCard from "@/components/NewsCard";
import ViralLoopBanner from "@/components/ViralLoopBanner";
import { TrendingUp, Lock, Sparkles, Zap } from "lucide-react";
import RecruitmentBar from "@/components/viral/RecruitmentBar";
import Link from "next/link";

export default async function HomePage() {
  const featured = await getFeaturedNews();
  const trending = await getTrendingNews();
  const newsItems = await getAllPosts();
  const categories = await getCategories();
  const lockedCount = await getLockedContentCount();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
      <div className="mb-8 md:mb-12">
        <p className="label-caps text-cyan-400/70 mb-2">Top Story</p>
        {featured[0] && <NewsCard item={featured[0]} variant="featured" />}
      </div>

      <ViralLoopBanner />

      <div className="mb-10 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecruitmentBar />
        </div>
        <Link
          href="/loops"
          className="group card-interactive flex flex-col items-center justify-center gap-3 p-6 text-center min-h-[140px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-rose-400/20 flex items-center justify-center ring-1 ring-white/10 group-hover:ring-cyan-400/30 transition-all">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="font-display font-bold text-zinc-100">12 Viral Loops</div>
            <div className="text-xs text-zinc-500 mt-1">Explore the full hub →</div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="label-caps mb-1">Feed</p>
              <h2 className="font-display text-3xl font-bold tracking-tight">Latest News</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="chip">
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {newsItems.slice(1).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="font-display font-bold">Trending</h3>
            </div>
            {trending.map((item) => (
              <NewsCard key={item.id} item={item} variant="compact" />
            ))}
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-rose-400" />
              <h3 className="font-display font-bold">Exclusive</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4">
              {lockedCount} stories locked behind verified Facebook follow.
            </p>
            <ul className="space-y-3 mb-5">
              {newsItems
                .filter((n) => n.tier !== "free")
                .slice(0, 3)
                .map((item) => (
                  <li key={item.id} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <Lock className="w-3.5 h-3.5 text-cyan-400/60 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2 leading-snug">{item.title}</span>
                  </li>
                ))}
            </ul>
            <Link href="/rewards" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              View all exclusives →
            </Link>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="font-display font-bold">Community</h3>
            </div>
            <div className="space-y-3">
              {[
                { rank: 1, name: "Maria G.", badge: "💎", label: "Early follower" },
                { rank: 2, name: "David K.", badge: "👍", label: "Community member" },
                { rank: 3, name: "Jennifer L.", badge: "👍", label: "Community member" },
              ].map((entry) => (
                <div key={entry.rank} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-600 w-4 tabular-nums">{entry.rank}</span>
                  <span className="text-base">{entry.badge}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-zinc-300 truncate">{entry.name}</div>
                    <div className="text-xs text-zinc-600">{entry.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
