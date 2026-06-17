"use client";

import { useViral } from "@/context/UserContext";
import { RECRUITMENT_CAMPAIGN, isRecruitmentUnlocked } from "@/lib/viral/engine";
import { Target } from "lucide-react";

export default function RecruitmentBar() {
  const { community } = useViral();
  const { targetFollows, title, description, unlockLabel } = RECRUITMENT_CAMPAIGN;
  const current = community.globalVerifiedFollows;
  const pct = Math.min(100, (current / targetFollows) * 100);
  const unlocked = isRecruitmentUnlocked(community);

  return (
    <section className="bg-white border border-stone-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-5 h-5 text-brand-600" />
        <h2 className="text-lg font-bold text-stone-900">Community-Powered Release</h2>
      </div>
      <p className="text-sm text-stone-600 mb-1">{title}</p>
      <p className="text-xs text-stone-500 mb-4">{description}</p>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-stone-500">{current.toLocaleString()} verified followers</span>
        <span className="font-semibold">{targetFollows.toLocaleString()} goal</span>
      </div>
      <div className="w-full bg-stone-100 rounded-full h-3 mb-2">
        <div className="bg-brand-500 h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-stone-500">
        {unlocked ? (
          <span className="text-emerald-600 font-medium">Unlocked: {unlockLabel}</span>
        ) : (
          <>Recruit neighbors — {(targetFollows - current).toLocaleString()} more to release {unlockLabel}</>
        )}
      </p>
    </section>
  );
}
