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
    <section className="bg-white rounded-xl border border-stone-200 p-6">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-brand-600" />
        <h2 className="text-lg font-bold text-stone-900">Neighborhood Unlock Map</h2>
      </div>
      <p className="text-sm text-stone-500 mb-4">
        Exclusive stories unlock when your neighborhood hits a follower threshold. Join your zone!
      </p>

      <div className="flex gap-2 mb-5">
        <input
          type="text"
          maxLength={5}
          placeholder="Your zip code"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          className="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm"
        />
        <button onClick={saveZip} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700">
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
              className={`rounded-lg border p-4 ${unlocked ? "border-emerald-200 bg-emerald-50" : "border-stone-200"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-stone-900">{zone.name}</span>
                {unlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Lock className="w-4 h-4 text-stone-400" />
                )}
              </div>
              <p className="text-xs text-stone-500 mb-2 line-clamp-1">{zone.storyTitle}</p>
              <div className="w-full bg-stone-200 rounded-full h-2 mb-1">
                <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: zone.color }} />
              </div>
              <p className="text-xs text-stone-500">
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
