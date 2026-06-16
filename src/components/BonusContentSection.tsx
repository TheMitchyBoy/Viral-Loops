"use client";

import { BonusContent } from "@/lib/types";
import { Lock, FileText, Video, Camera, MessageSquare } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getSharesForContent } from "@/lib/viral-engine";

const typeIcons = {
  "extended-article": FileText,
  "bonus-video": Video,
  "photo-gallery": Camera,
  interview: MessageSquare,
};

interface BonusContentSectionProps {
  bonuses: BonusContent[];
  parentId: string;
}

export default function BonusContentSection({ bonuses, parentId }: BonusContentSectionProps) {
  const { profile } = useUser();

  if (bonuses.length === 0) return null;

  const contentShares = getSharesForContent(parentId);

  return (
    <section className="mt-10 border-t border-stone-200 pt-8">
      <h2 className="text-xl font-bold text-stone-900 mb-1">Bonus Content</h2>
      <p className="text-sm text-stone-500 mb-6">
        Share this story to unlock exclusive bonus material
      </p>

      <div className="grid gap-4">
        {bonuses.map((bonus) => {
          const Icon = typeIcons[bonus.type];
          const unlocked = contentShares >= bonus.unlockShares || profile.unlockedContent.includes(parentId);

          return (
            <div
              key={bonus.id}
              className={`rounded-xl border p-5 transition-colors ${
                unlocked
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-stone-200 bg-stone-50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    unlocked ? "bg-emerald-100" : "bg-stone-200"
                  }`}
                >
                  {unlocked ? (
                    <Icon className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Lock className="w-5 h-5 text-stone-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-900">{bonus.title}</h3>
                  <p className="text-sm text-stone-500 mt-0.5">{bonus.description}</p>
                  {unlocked ? (
                    <p className="text-sm text-stone-700 mt-3 leading-relaxed">{bonus.content}</p>
                  ) : (
                    <p className="text-xs text-stone-400 mt-2">
                      Share {bonus.unlockShares} time{bonus.unlockShares > 1 ? "s" : ""} to unlock
                      {contentShares > 0 && ` (${contentShares}/${bonus.unlockShares})`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
