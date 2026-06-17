"use client";

import { useState } from "react";
import { useUser, useViral } from "@/context/UserContext";
import { NEIGHBORHOOD_ZONES, isZoneUnlocked } from "@/lib/viral/engine";
import { MapPin, Lock, Unlock } from "lucide-react";

export default function NeighborhoodMap() {
  const { updateZip } = useUser();
  const { viral, community } = useViral();
  const [zip, setZip] = useState(viral.zipCode ?? "");

  const saveZip = () => {
    if (zip.length === 5) updateZip(zip);
  };

  return (
    <section className="card p-6">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-cyan-400" />
        <h2 className="font-display font-bold text-lg">Neighborhood Unlock Map</h2>
      </div>
      <p className="text-sm text-zinc-500 mb-4">
        Exclusive stories unlock when your neighborhood hits a follower threshold. Join your zone!
      </p>

      <div className="flex gap-2 mb-5">
        <input
          type="text"
          maxLength={5}
          placeholder="Your zip code"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          className="input-modern flex-1"
        />
        <button onClick={saveZip} className="btn-primary !px-4 !py-2 text-sm">
          Join Zone
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {NEIGHBORHOOD_ZONES.map((zone) => {
          const count = community.zoneFollowers[zone.id] ?? 0;
          const unlocked = isZoneUnlocked(zone.id, community);
          const pct = Math.min(100, (count / zone.threshold) * 100);
          const isMine = viral.zonesJoined.includes(zone.id);

          return (
            <div
              key={zone.id}
              className={`rounded-xl border p-4 transition-colors ${
                unlocked ? "border-emerald-500/30 bg-emerald-500/10" : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-zinc-200">{zone.name}</span>
                {unlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-zinc-600" />
                )}
              </div>
              <p className="text-xs text-zinc-500 mb-2 line-clamp-1">{zone.storyTitle}</p>
              <div className="w-full bg-white/[0.06] rounded-full h-2 mb-1">
                <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: zone.color }} />
              </div>
              <p className="text-xs text-zinc-500">
                {count}/{zone.threshold} followers {isMine && "· You're in!"}
                {!unlocked && ` · ${zone.threshold - count} to go`}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
