"use client";

import { Lock, Share2, Gift, Star } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface LockOverlayProps {
  contentId: string;
  slug: string;
  title: string;
  tier: string;
  shareReward: number;
  unlockRequirement?: { type: string; count: number };
}

export default function LockOverlay({
  contentId,
  slug,
  title,
  tier,
  shareReward,
  unlockRequirement,
}: LockOverlayProps) {
  const { setShareTarget, setShowShareModal, profile } = useUser();

  const message =
    tier === "premium"
      ? `Reach ${unlockRequirement?.count?.toLocaleString() ?? 1500} points to unlock this Insider exclusive`
      : "Share this story to unlock the full content and earn reward points";

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white z-10" />
      <div className="relative z-20 -mt-32 pb-8">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-stone-200 p-8 text-center animate-slide-up">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-brand-600" />
          </div>

          <h3 className="text-xl font-bold text-stone-900 mb-2">Content Locked</h3>
          <p className="text-stone-500 text-sm mb-6">{message}</p>

          <div className="flex items-center justify-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1.5 text-brand-600">
              <Gift className="w-4 h-4" />
              <span className="font-semibold">+{shareReward} pts</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-600">
              <Star className="w-4 h-4" />
              <span className="font-semibold">Bonus content</span>
            </div>
          </div>

          {tier === "share-unlock" ? (
            <button
              onClick={() => {
                setShareTarget({ id: contentId, slug, title, reward: shareReward });
                setShowShareModal(true);
              }}
              className="w-full bg-brand-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share to Unlock
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-stone-50 rounded-lg p-3 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-stone-500">Your points</span>
                  <span className="font-bold text-stone-900">{profile.points}</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (profile.points / (unlockRequirement?.count ?? 1500)) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  {(unlockRequirement?.count ?? 1500) - profile.points} points to go
                </p>
              </div>
              <button
                onClick={() => {
                  setShareTarget({ id: contentId, slug, title, reward: shareReward });
                  setShowShareModal(true);
                }}
                className="w-full bg-brand-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Stories to Earn Points
              </button>
            </div>
          )}

          <p className="text-xs text-stone-400 mt-4">
            Or refer friends with code <strong>{profile.referralCode}</strong> for +50 pts each
          </p>
        </div>
      </div>
    </div>
  );
}
