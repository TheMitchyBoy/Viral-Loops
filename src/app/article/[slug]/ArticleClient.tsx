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
import { Clock, User, Eye, ArrowLeft } from "lucide-react";

interface ArticlePageProps {
  article: NewsItem;
}

export default function ArticleClient({ article }: ArticlePageProps) {
  const { checkUnlocked } = useUser();
  const unlocked = checkUnlocked(article.tier);
  const bonuses = getBonusForContent(article.id);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-brand-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded">
          {article.category}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-4">
        {article.title}
      </h1>

      <p className="text-lg text-stone-600 mb-6">{article.excerpt}</p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-6 pb-6 border-b border-stone-200">
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

      <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
        <Image src={article.imageUrl} alt={article.title} fill className="object-cover" priority />
      </div>

      {unlocked ? (
        <>
          <div className="prose-news text-stone-800 text-lg">
            {article.body?.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <h2 key={i} className="text-xl font-bold mt-8 mb-4 text-stone-900">
                    {paragraph.replace(/\*\*/g, "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc pl-6 mb-4 space-y-1">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace(/^- /, "").replace(/\*\*/g, "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />
              );
            })}
          </div>

          <FollowPrompt contentId={article.id} slug={article.slug} title={article.title} />
          <BonusContentSection bonuses={bonuses} />
        </>
      ) : (
        <>
          <div className="prose-news text-stone-800 text-lg blur-sm select-none max-h-64 overflow-hidden">
            <p>{article.body?.substring(0, 500)}...</p>
          </div>
          <LockOverlay contentId={article.id} slug={article.slug} title={article.title} />
        </>
      )}
    </article>
  );
}
