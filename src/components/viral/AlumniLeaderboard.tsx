"use client";

import { useUser, useViral } from "@/context/UserContext";
import { ALUMNI_CLASSES } from "@/lib/viral/data";
import { GraduationCap } from "lucide-react";

export default function AlumniLeaderboard() {
  const { updateAlumniYear } = useUser();
  const { viral, community } = useViral();

  const sorted = [...ALUMNI_CLASSES].sort(
    (a, b) => (community.alumniCounts[b.year] ?? 0) - (community.alumniCounts[a.year] ?? 0)
  );

  return (
    <section className="card p-6">
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap className="w-5 h-5 text-cyan-400" />
        <h2 className="font-display font-bold text-lg">Alumni Pride Loop</h2>
      </div>
      <p className="text-sm text-zinc-500 mb-4">
        Riverside High classes compete to unlock full championship coverage. Pick your class!
      </p>

      <select
        value={viral.alumniYear ?? ""}
        onChange={(e) => updateAlumniYear(e.target.value)}
        className="input-modern mb-4"
      >
        <option value="">Select graduation year</option>
        {ALUMNI_CLASSES.map((c) => (
          <option key={c.year} value={c.year}>{c.label}</option>
        ))}
      </select>

      <div className="space-y-2">
        {sorted.map((c, i) => {
          const count = community.alumniCounts[c.year] ?? 0;
          const isMine = viral.alumniYear === c.year;
          return (
            <div
              key={c.year}
              className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                isMine ? "border border-cyan-500/30 bg-cyan-500/10" : "glass"
              }`}
            >
              <span className="text-sm font-bold text-zinc-600 w-5 tabular-nums">{i + 1}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-zinc-200">{c.label}</div>
                <div className="text-xs text-zinc-500">{count} verified followers</div>
              </div>
              {isMine && <span className="text-xs text-cyan-400 font-medium">Your class</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
