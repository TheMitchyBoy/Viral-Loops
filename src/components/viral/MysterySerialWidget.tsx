"use client";

import { useViral } from "@/context/UserContext";
import { MYSTERY_SERIAL, getAvailableMysteryClues } from "@/lib/viral/engine";
import { Search, Lock } from "lucide-react";

export default function MysterySerialWidget() {
  const { profile, viral } = useViral();
  const clues = getAvailableMysteryClues(viral, profile);
  const verified = profile.followedFacebook && profile.facebookUserId;

  return (
    <section className="card-solid p-6 ring-1 ring-rose-500/10">
      <div className="flex items-center gap-2 mb-2">
        <Search className="w-5 h-5 text-rose-400" />
        <h2 className="font-display font-bold text-lg">{MYSTERY_SERIAL.title}</h2>
      </div>
      <p className="text-sm text-zinc-500 mb-5">{MYSTERY_SERIAL.description}</p>

      {!verified ? (
        <p className="text-sm text-zinc-600 flex items-center gap-2">
          <Lock className="w-4 h-4" /> Verify Facebook follow to receive daily clues
        </p>
      ) : (
        <div className="space-y-3">
          {MYSTERY_SERIAL.clues.map((clue) => {
            const unlocked = clues.some((c) => c.day === clue.day);
            return (
              <div
                key={clue.day}
                className={`rounded-xl p-4 border transition-colors ${
                  unlocked ? "border-cyan-500/40 bg-cyan-500/10" : "border-white/[0.08] bg-white/[0.02] opacity-40"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-cyan-400">
                    {clue.bonus ? "BONUS" : `DAY ${clue.day}`}
                  </span>
                  {unlocked ? null : <Lock className="w-3 h-3 text-zinc-600" />}
                </div>
                <h3 className="font-semibold text-sm mb-1 text-zinc-200">{clue.title}</h3>
                {unlocked ? (
                  <p className="text-xs text-zinc-400">{clue.content}</p>
                ) : (
                  <p className="text-xs text-zinc-600">Unlocks {clue.bonus ? "when you refer a friend" : `on day ${clue.day}`}</p>
                )}
              </div>
            );
          })}
          <p className="text-xs text-zinc-600 pt-2">
            {clues.length}/{MYSTERY_SERIAL.clues.length} clues unlocked · Refer friends for bonus intel
          </p>
        </div>
      )}
    </section>
  );
}
