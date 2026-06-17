"use client";

import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "@/lib/types";
import { formatDate, formatNumber, cn } from "@/lib/utils";
import { Clock, Play, Lock, Facebook, Eye, ArrowUpRight } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface NewsCardProps {
  item: NewsItem;
  variant?: "default" | "featured" | "compact";
}

export default function NewsCard({ item, variant = "default" }: NewsCardProps) {
  const { checkUnlocked, setFollowTarget, setShowFollowModal } = useUser();
  const unlocked = checkUnlocked(item.tier);
  const href = item.type === "video" ? `/video/${item.slug}` : `/article/${item.slug}`;

  const tierBadge = {
    free: { label: "Free", class: "tier-free" },
    "follow-unlock": { label: "Follow", class: "tier-follow" },
    premium: { label: "Exclusive", class: "tier-follow" },
  }[item.tier];

  if (variant === "featured") {
    return (
      <Link href={href} className="group relative block rounded-3xl overflow-hidden aspect-[16/9] ring-1 ring-white/[0.08]">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-6 h-6 text-white/80" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="chip chip-active !text-[10px]">{item.category}</span>
            {item.tier !== "free" && (
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", tierBadge.class)}>
                {!unlocked && <Lock className="w-3 h-3 inline mr-1" />}
                {tierBadge.label}
              </span>
            )}
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-bold leading-[1.1] mb-3 tracking-tight group-hover:text-gradient transition-all">
            {item.title}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">{item.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span>{item.author}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>{formatDate(item.publishedAt)}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {formatNumber(item.viewCount)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex gap-3 py-3.5 border-b border-white/[0.06] last:border-0">
        <div className="relative w-[4.5rem] h-[4.5rem] rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-white/[0.08]">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <h3 className="font-medium text-sm text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-zinc-500">
            <span>{timeAgo(item.publishedAt)}</span>
            {item.tier !== "free" && !unlocked && (
              <>
                <span className="text-zinc-700">·</span>
                <span className="text-cyan-400/80">Locked</span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="group card-interactive overflow-hidden">
      <Link href={href}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full glass-strong flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-cyan-300 fill-cyan-300 ml-0.5" />
              </div>
            </div>
          )}
          {item.tier !== "free" && !unlocked && (
            <div className="absolute top-3 right-3 glass-strong text-xs px-2.5 py-1 rounded-full flex items-center gap-1 text-zinc-300">
              <Lock className="w-3 h-3 text-cyan-400" /> Locked
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="label-caps !text-cyan-400/80">{item.category}</span>
          {item.tier !== "free" && (
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", tierBadge.class)}>
              {tierBadge.label}
            </span>
          )}
        </div>
        <Link href={href}>
          <h3 className="font-display font-bold text-lg text-zinc-100 group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2 tracking-tight">
            {item.title}
          </h3>
        </Link>
        <p className="text-sm text-zinc-500 line-clamp-2 mb-4 leading-relaxed">{item.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-zinc-600">
            {item.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {item.readTime}m
              </span>
            )}
            {item.duration && (
              <span className="flex items-center gap-1">
                <Play className="w-3 h-3" /> {item.duration}m
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {formatNumber(item.viewCount)}
            </span>
          </div>
          {item.tier !== "free" && !unlocked && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setFollowTarget({ id: item.id, slug: item.slug, title: item.title });
                setShowFollowModal(true);
              }}
              className="flex items-center gap-1 text-xs font-semibold text-cyan-400 glass px-2.5 py-1 rounded-full hover:bg-cyan-400/10 transition-colors"
            >
              <Facebook className="w-3 h-3" /> Follow
            </button>
          )}
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
