"use client";

import { Share2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface SharePromptProps {
  contentId: string;
  slug: string;
  title: string;
  shareReward: number;
  shareCount: number;
}

export default function SharePrompt({ contentId, slug, title, shareReward, shareCount }: SharePromptProps) {
  const { setShareTarget, setShowShareModal } = useUser();

  return (
    <div className="bg-gradient-to-r from-brand-50 to-amber-50 border border-brand-200 rounded-xl p-5 my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-stone-900 mb-1">Found this story important?</h3>
          <p className="text-sm text-stone-600">
            Share with your neighbors and earn <strong className="text-brand-600">+{shareReward} points</strong>.
            {shareCount > 0 && (
              <span className="text-stone-400"> · {shareCount.toLocaleString()} people have shared this</span>
            )}
          </p>
        </div>
        <button
          onClick={() => {
            setShareTarget({ id: contentId, slug, title, reward: shareReward });
            setShowShareModal(true);
          }}
          className="flex items-center gap-2 bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-colors whitespace-nowrap"
        >
          <Share2 className="w-4 h-4" />
          Share & Earn +{shareReward}
        </button>
      </div>
    </div>
  );
}
