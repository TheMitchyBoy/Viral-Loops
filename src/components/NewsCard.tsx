"use client";

import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "@/lib/types";
import { formatDate, formatNumber, cn } from "@/lib/utils";
import { Clock, Play, Lock, Share2, Eye } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface NewsCardProps {
  item: NewsItem;
  variant?: "default" | "featured" | "compact";
}

export default function NewsCard({ item, variant = "default" }: NewsCardProps) {
  const { checkUnlocked, setShareTarget, setShowShareModal } = useUser();
  const unlocked = checkUnlocked(item.id, item.tier, item.unlockRequirement);
  const href = item.type === "video" ? `/video/${item.slug}` : `/article/${item.slug}`;

  const tierBadge = {
    free: { label: "Free", class: "tier-free" },
    "share-unlock": { label: "Share to Unlock", class: "tier-share" },
    premium: { label: "Insider", class: "tier-premium" },
  }[item.tier];

  if (variant === "featured") {
    return (
      <Link href={href} className="group relative block rounded-2xl overflow-hidden aspect-[16/9] shadow-lg">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider bg-brand-600 px-2 py-0.5 rounded">
              {item.category}
            </span>
            {item.tier !== "free" && (
              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded", tierBadge.class)}>
                {!unlocked && <Lock className="w-3 h-3 inline mr-1" />}
                {tierBadge.label}
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2 group-hover:text-brand-300 transition-colors">
            {item.title}
          </h2>
          <p className="text-stone-300 text-sm line-clamp-2 mb-3">{item.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-stone-400">
            <span>{item.author}</span>
            <span>{formatDate(item.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Share2 className="w-3 h-3" /> {formatNumber(item.shareCount)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex gap-3 py-3 border-b border-stone-100 last:border-0">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-stone-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
            <span>{timeAgo(item.publishedAt)}</span>
            <span>·</span>
            <span className="text-brand-600 font-medium">+{item.shareReward} pts</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={href}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-brand-600 fill-brand-600 ml-0.5" />
              </div>
            </div>
          )}
          {item.tier !== "free" && !unlocked && (
            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3" /> Locked
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">{item.category}</span>
          <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded", tierBadge.class)}>
            {tierBadge.label}
          </span>
        </div>
        <Link href={href}>
          <h3 className="font-bold text-stone-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
            {item.title}
          </h3>
        </Link>
        <p className="text-sm text-stone-500 line-clamp-2 mb-3">{item.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-stone-400">
            {item.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {item.readTime} min
              </span>
            )}
            {item.duration && (
              <span className="flex items-center gap-1">
                <Play className="w-3 h-3" /> {item.duration} min
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {formatNumber(item.viewCount)}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShareTarget({ id: item.id, slug: item.slug, title: item.title, reward: item.shareReward });
              setShowShareModal(true);
            }}
            className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 px-2 py-1 rounded-full hover:bg-brand-100 transition-colors"
          >
            <Share2 className="w-3 h-3" /> +{item.shareReward}
          </button>
        </div>
      </div>
    </article>
  );
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
