"use client";

import { useViral } from "@/context/UserContext";
import { SCARCITY_DROP, isScarcityAvailable } from "@/lib/viral/engine";
import { Zap } from "lucide-react";

export default function ScarcityDropWidget() {
  const { community } = useViral();
  const remaining = SCARCITY_DROP.totalSpots - community.scarcityClaimed;
  const available = isScarcityAvailable(community);

  return (
    <section className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-5 h-5" />
        <h2 className="text-lg font-bold">Flash Exclusive Drop</h2>
      </div>
      <p className="text-amber-100 text-sm mb-1">{SCARCITY_DROP.title}</p>
      <p className="text-xs text-amber-200 mb-4">{SCARCITY_DROP.description}</p>
      <div className="bg-white/20 rounded-xl p-4 text-center">
        <div className="text-4xl font-bold">{remaining}</div>
        <div className="text-sm text-amber-100">spots left of {SCARCITY_DROP.totalSpots}</div>
      </div>
      <p className="text-xs text-amber-200 mt-3 text-center">
        {available
          ? `${SCARCITY_DROP.assetLabel} — claim yours with a verified Facebook follow`
          : "All spots claimed — join the waitlist on Facebook"}
      </p>
    </section>
  );
}
