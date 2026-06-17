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
    <section className="bg-white border border-stone-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-bold text-stone-900">Alumni Pride Loop</h2>
      </div>
      <p className="text-sm text-stone-500 mb-4">
        Riverside High classes compete to unlock full championship coverage. Pick your class!
      </p>

      <select
        value={viral.alumniYear ?? ""}
        onChange={(e) => updateAlumniYear(e.target.value)}
        className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm mb-4"
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
            <div key={c.year} className={`flex items-center gap-3 rounded-lg p-3 ${isMine ? "bg-blue-50 border border-blue-200" : "bg-stone-50"}`}>
              <span className="text-sm font-bold text-stone-400 w-5">{i + 1}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold">{c.label}</div>
                <div className="text-xs text-stone-500">{count} verified followers</div>
              </div>
              {isMine && <span className="text-xs text-blue-600 font-medium">Your class</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
