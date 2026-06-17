"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { BUSINESS_PARTNERS } from "@/lib/viral/data";
import { Store, Check } from "lucide-react";

export default function BusinessLoop() {
  const { checkIn, profile } = useUser();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const partner = BUSINESS_PARTNERS.find(
      (p) => p.checkInCode.toLowerCase() === code.trim().toLowerCase()
    );
    if (partner) {
      checkIn(partner.id);
      setMsg(`Checked in at ${partner.name}! ${partner.perk}`);
      setCode("");
    } else {
      setMsg("Invalid check-in code. Visit a partner location for the code.");
    }
  };

  const verified = profile.followedFacebook && profile.facebookUserId;

  return (
    <section className="card p-6">
      <div className="flex items-center gap-2 mb-2">
        <Store className="w-5 h-5 text-cyan-400" />
        <h2 className="font-display font-bold text-lg">Local Business Loop</h2>
      </div>
      <p className="text-sm text-zinc-500 mb-4">
        Check in at partner businesses to unlock insider previews and local perks.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 mb-5">
        {BUSINESS_PARTNERS.map((p) => {
          const done = profile.viral?.businessCheckIns.includes(p.id);
          return (
            <div
              key={p.id}
              className={`rounded-xl border p-4 transition-colors ${
                done ? "border-emerald-500/30 bg-emerald-500/10" : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-zinc-200">{p.name}</span>
                {done && <Check className="w-4 h-4 text-emerald-400" />}
              </div>
              <p className="text-xs text-zinc-500 mb-1">{p.address}</p>
              <p className="text-xs text-cyan-400">{p.perk}</p>
            </div>
          );
        })}
      </div>

      {verified ? (
        <form onSubmit={handleCheckIn} className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter check-in code from partner"
            className="input-modern flex-1"
          />
          <button type="submit" className="btn-primary !px-4 !py-2 text-sm">
            Check In
          </button>
        </form>
      ) : (
        <p className="text-sm text-zinc-500">Verify Facebook follow to check in.</p>
      )}
      {msg && <p className="text-sm mt-2 text-zinc-400">{msg}</p>}
    </section>
  );
}
