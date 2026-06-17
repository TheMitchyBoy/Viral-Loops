"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/lib/types";
import { getBonusForContent } from "@/lib/data";
import { formatDate, formatNumber } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import FollowPrompt from "@/components/FollowPrompt";
import LockOverlay from "@/components/LockOverlay";
import BonusContentSection from "@/components/BonusContentSection";
import { Play, User, Eye, ArrowLeft, Clock } from "lucide-react";

interface VideoClientProps {
  video: NewsItem;
}

export default function VideoClient({ video }: VideoClientProps) {
  const { checkUnlocked } = useUser();
  const unlocked = checkUnlocked(video.tier);
  const bonuses = getBonusForContent(video.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-cyan-400 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="mb-4">
        <span className="label-caps text-cyan-400/80 chip !border-cyan-500/20 !bg-cyan-500/10">
          {video.category} · Video
        </span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4 tracking-tight">
        {video.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-6">
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
      </div>

      {unlocked ? (
        <>
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-black ring-1 ring-white/[0.08] shadow-2xl shadow-cyan-500/5">
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

          <p className="text-lg text-zinc-400 mb-6 font-serif">{video.excerpt}</p>

          <FollowPrompt contentId={video.id} slug={video.slug} title={video.title} />
          <BonusContentSection bonuses={bonuses} />
        </>
      ) : (
        <>
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-zinc-950 ring-1 ring-white/[0.08]">
            <Image src={video.imageUrl} alt={video.title} fill className="object-cover opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 glass-strong rounded-full flex items-center justify-center">
                <Play className="w-10 h-10 text-cyan-300 fill-cyan-300" />
              </div>
            </div>
          </div>
          <p className="text-lg text-zinc-400 mb-2 font-serif">{video.excerpt}</p>
          <LockOverlay contentId={video.id} slug={video.slug} title={video.title} />
        </>
      )}
    </div>
  );
}
