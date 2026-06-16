"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/lib/types";
import { getBonusForContent } from "@/lib/data";
import { formatDate, formatNumber } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import SharePrompt from "@/components/SharePrompt";
import LockOverlay from "@/components/LockOverlay";
import BonusContentSection from "@/components/BonusContentSection";
import { Play, User, Share2, Eye, ArrowLeft, Clock } from "lucide-react";

interface VideoClientProps {
  video: NewsItem;
}

export default function VideoClient({ video }: VideoClientProps) {
  const { checkUnlocked } = useUser();
  const unlocked = checkUnlocked(video.id, video.tier, video.unlockRequirement);
  const bonuses = getBonusForContent(video.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-brand-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded">
          {video.category} · Video
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-4">
        {video.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-6">
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4" /> {video.author}
        </span>
        <span>{formatDate(video.publishedAt)}</span>
        {video.duration && (
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {video.duration} min
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Eye className="w-4 h-4" /> {formatNumber(video.viewCount)} views
        </span>
        <span className="flex items-center gap-1.5">
          <Share2 className="w-4 h-4" /> {formatNumber(video.shareCount)} shares
        </span>
      </div>

      {unlocked ? (
        <>
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-black shadow-lg">
            {video.videoUrl ? (
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={video.imageUrl} alt={video.title} fill className="object-cover opacity-50" />
                <Play className="w-16 h-16 text-white relative z-10" />
              </div>
            )}
          </div>

          <p className="text-lg text-stone-600 mb-6">{video.excerpt}</p>

          <SharePrompt
            contentId={video.id}
            slug={video.slug}
            title={video.title}
            shareReward={video.shareReward}
            shareCount={video.shareCount}
          />

          <BonusContentSection bonuses={bonuses} parentId={video.id} />
        </>
      ) : (
        <>
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-stone-900">
            <Image src={video.imageUrl} alt={video.title} fill className="object-cover opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="w-10 h-10 text-white fill-white" />
              </div>
            </div>
          </div>
          <p className="text-lg text-stone-600 mb-2">{video.excerpt}</p>
          <LockOverlay
            contentId={video.id}
            slug={video.slug}
            title={video.title}
            tier={video.tier}
            shareReward={video.shareReward}
            unlockRequirement={video.unlockRequirement}
          />
        </>
      )}
    </div>
  );
}
