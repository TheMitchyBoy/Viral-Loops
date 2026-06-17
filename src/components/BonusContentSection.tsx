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
    <section className="mt-10 border-t border-white/[0.08] pt-8">
      <h2 className="font-display text-xl font-bold mb-1">Bonus Content</h2>
      <p className="text-sm text-zinc-500 mb-6">
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
              className={`rounded-2xl border p-5 transition-colors ${
                unlocked ? "border-emerald-500/30 bg-emerald-500/10" : "card"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    unlocked ? "bg-emerald-500/20" : "glass"
                  }`}
                >
                  {unlocked ? (
                    <Icon className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-zinc-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-200">{bonus.title}</h3>
                  <p className="text-sm text-zinc-500 mt-0.5">{bonus.description}</p>
                  {unlocked ? (
                    <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{bonus.content}</p>
                  ) : (
                    <p className="text-xs text-zinc-600 mt-2">Follow on Facebook to unlock</p>
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
