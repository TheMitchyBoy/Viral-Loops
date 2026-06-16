"use client";

import { BonusContent } from "@/lib/types";
import { Lock, FileText, Video, Camera, MessageSquare } from "lucide-react";
import { useUser } from "@/context/UserContext";

const typeIcons = {
  "extended-article": FileText,
  "bonus-video": Video,
  "photo-gallery": Camera,
  interview: MessageSquare,
};

interface BonusContentSectionProps {
  bonuses: BonusContent[];
}

export default function BonusContentSection({ bonuses }: BonusContentSectionProps) {
  const { profile } = useUser();

  if (bonuses.length === 0) return null;

  return (
    <section className="mt-10 border-t border-stone-200 pt-8">
      <h2 className="text-xl font-bold text-stone-900 mb-1">Bonus Content</h2>
      <p className="text-sm text-stone-500 mb-6">
        {profile.followedFacebook && profile.facebookUserId
          ? "Exclusive bonus material for Facebook followers"
          : "Follow on Facebook to unlock exclusive bonus material"}
      </p>

      <div className="grid gap-4">
        {bonuses.map((bonus) => {
          const Icon = typeIcons[bonus.type];
          const unlocked = profile.followedFacebook && Boolean(profile.facebookUserId);

          return (
            <div
              key={bonus.id}
              className={`rounded-xl border p-5 transition-colors ${
                unlocked ? "border-emerald-200 bg-emerald-50" : "border-stone-200 bg-stone-50"
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
                    <p className="text-xs text-stone-400 mt-2">Follow on Facebook to unlock</p>
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
