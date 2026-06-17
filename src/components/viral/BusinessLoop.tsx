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
    <section className="bg-white border border-stone-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <Store className="w-5 h-5 text-brand-600" />
        <h2 className="text-lg font-bold text-stone-900">Local Business Loop</h2>
      </div>
      <p className="text-sm text-stone-500 mb-4">
        Check in at partner businesses to unlock insider previews and local perks.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 mb-5">
        {BUSINESS_PARTNERS.map((p) => {
          const done = profile.viral?.businessCheckIns.includes(p.id);
          return (
            <div key={p.id} className={`rounded-lg border p-4 ${done ? "border-emerald-200 bg-emerald-50" : "border-stone-200"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">{p.name}</span>
                {done && <Check className="w-4 h-4 text-emerald-600" />}
              </div>
              <p className="text-xs text-stone-500 mb-1">{p.address}</p>
              <p className="text-xs text-brand-600">{p.perk}</p>
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
            className="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm"
          />
          <button type="submit" className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700">
            Check In
          </button>
        </form>
      ) : (
        <p className="text-sm text-stone-500">Verify Facebook follow to check in.</p>
      )}
      {msg && <p className="text-sm mt-2 text-stone-600">{msg}</p>}
    </section>
  );
}
