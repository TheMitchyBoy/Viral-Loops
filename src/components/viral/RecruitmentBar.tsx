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
    <section className="card p-5 md:p-6">
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-5 h-5 text-cyan-400" />
        <h2 className="font-display font-bold text-lg">Community-Powered Release</h2>
      </div>
      <p className="text-sm text-zinc-300 mb-1">{title}</p>
      <p className="text-xs text-zinc-500 mb-5">{description}</p>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-zinc-500">{current.toLocaleString()} verified</span>
        <span className="font-semibold text-zinc-300 tabular-nums">{targetFollows.toLocaleString()} goal</span>
      </div>
      <div className="w-full bg-white/[0.06] rounded-full h-2 mb-3 overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-zinc-500">
        {unlocked ? (
          <span className="text-emerald-400 font-medium">Unlocked: {unlockLabel}</span>
        ) : (
          <>{(targetFollows - current).toLocaleString()} more to release {unlockLabel}</>
        )}
      </p>
    </section>
  );
}
