"use client";

import { useViral } from "@/context/UserContext";
import { SCARCITY_DROP, isScarcityAvailable } from "@/lib/viral/engine";
import { Zap } from "lucide-react";

export default function ScarcityDropWidget() {
  const { community } = useViral();
  const remaining = SCARCITY_DROP.totalSpots - community.scarcityClaimed;
  const available = isScarcityAvailable(community);

  return (
    <section className="relative overflow-hidden rounded-2xl p-6 ring-1 ring-amber-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-600/15 to-rose-500/10" />
      <div className="absolute inset-0 backdrop-blur-xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="font-display font-bold text-lg">Flash Exclusive Drop</h2>
        </div>
        <p className="text-amber-200/80 text-sm mb-1">{SCARCITY_DROP.title}</p>
        <p className="text-xs text-zinc-500 mb-4">{SCARCITY_DROP.description}</p>
        <div className="glass-strong rounded-2xl p-5 text-center">
          <div className="font-display text-5xl font-bold text-gradient">{remaining}</div>
          <div className="text-sm text-zinc-400 mt-1">spots left of {SCARCITY_DROP.totalSpots}</div>
        </div>
        <p className="text-xs text-zinc-500 mt-3 text-center">
          {available
            ? `${SCARCITY_DROP.assetLabel} — claim yours with a verified Facebook follow`
            : "All spots claimed — join the waitlist on Facebook"}
        </p>
      </div>
    </section>
  );
}
