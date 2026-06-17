"use client";

import { getStoryCredits } from "@/lib/viral/engine";
import { Users } from "lucide-react";

interface StoryCreditsProps {
  storyId: string;
}

export default function StoryCredits({ storyId }: StoryCreditsProps) {
  const credits = getStoryCredits(storyId).sort((a, b) => b.readersReached - a.readersReached);

  if (credits.length === 0) return null;

  const total = credits.reduce((s, c) => s + c.readersReached, 0);

  return (
    <div className="card border-amber-500/20 bg-amber-500/[0.06] p-5 my-6">
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-5 h-5 text-amber-400" />
        <h3 className="font-display font-bold">Community Credits</h3>
      </div>
      <p className="text-sm text-zinc-400 mb-3">
        This story reached <strong className="text-zinc-200">{total.toLocaleString()} readers</strong> through neighbors who shared their referral link:
      </p>
      <div className="flex flex-wrap gap-2">
        {credits.slice(0, 8).map((c) => (
          <span key={c.userId} className="text-xs glass rounded-full px-3 py-1 text-zinc-300">
            {c.name} · {c.readersReached} reached
          </span>
        ))}
      </div>
    </div>
  );
}
