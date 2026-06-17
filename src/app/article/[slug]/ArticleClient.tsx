"use client";

import Image from "next/image";
import Link from "next/link";
import { BonusContent, NewsItem } from "@/lib/types";
import { INVESTIGATION_POST_ID } from "@/lib/constants";
import { formatDate, formatNumber } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import FollowPrompt from "@/components/FollowPrompt";
import LockOverlay from "@/components/LockOverlay";
import BonusContentSection from "@/components/BonusContentSection";
import ArticleBody from "@/components/ArticleBody";
import StoryCredits from "@/components/viral/StoryCredits";
import QuestionUnlock from "@/components/viral/QuestionUnlock";
import LiveVoteGate from "@/components/viral/LiveVoteGate";
import InformedReceipt from "@/components/viral/InformedReceipt";
import { Clock, User, Eye, ArrowLeft } from "lucide-react";

interface ArticlePageProps {
  article: NewsItem;
  bonuses: BonusContent[];
}

export default function ArticleClient({ article, bonuses }: ArticlePageProps) {
  const { checkUnlocked } = useUser();
  const unlocked = checkUnlocked(article.tier);
  const isInvestigation = article.id === INVESTIGATION_POST_ID;

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-cyan-400 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="mb-4">
        <span className="label-caps text-cyan-400/80 chip !border-cyan-500/20 !bg-cyan-500/10">
          {article.category}
        </span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4 tracking-tight">
        {article.title}
      </h1>

      <p className="text-lg text-zinc-400 mb-6 font-serif">{article.excerpt}</p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-6 pb-6 border-b border-white/[0.08]">
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4" /> {article.author}
        </span>
        <span>{formatDate(article.publishedAt)}</span>
        {article.readTime && (
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {article.readTime} min read
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Eye className="w-4 h-4" /> {formatNumber(article.viewCount)} views
        </span>
      </div>

      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 ring-1 ring-white/[0.08]">
        <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority />
      </div>

      {isInvestigation && <StoryCredits storyId={INVESTIGATION_POST_ID} />}

      {unlocked ? (
        <>
          <ArticleBody body={article.body ?? ""} />

          <FollowPrompt contentId={article.id} slug={article.slug} title={article.title} />
          <InformedReceipt storyId={article.id} storyTitle={article.title} />
          <BonusContentSection bonuses={bonuses} />
        </>
      ) : (
        <>
          {isInvestigation && (
            <>
              <QuestionUnlock storyId={INVESTIGATION_POST_ID} storyTitle={article.title} />
              <LiveVoteGate pollId="poll-contamination" />
            </>
          )}
          <div className="prose-news text-lg blur-sm select-none max-h-64 overflow-hidden">
            <p>{article.body?.substring(0, 500)}...</p>
          </div>
          <LockOverlay contentId={article.id} slug={article.slug} title={article.title} />
        </>
      )}
    </article>
  );
}
