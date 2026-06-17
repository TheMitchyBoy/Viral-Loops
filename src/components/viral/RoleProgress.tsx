"use client";

import { useViral } from "@/context/UserContext";
import { ROLE_DEFINITIONS, getRoleInfo } from "@/lib/viral/engine";
import { getReferralUrl } from "@/lib/viral/engine";
import { Shield, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function RoleProgress() {
  const { viral } = useViral();
  const current = getRoleInfo(viral.role);
  const [copied, setCopied] = useState(false);

  const copyRef = () => {
    navigator.clipboard.writeText(getReferralUrl(viral.referralCode));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="card p-6">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-5 h-5 text-purple-400" />
        <h2 className="font-display font-bold text-lg">Community Roles</h2>
      </div>
      <p className="text-sm text-zinc-500 mb-4">
        Level up from Reader to Insider by participating in local news loops.
      </p>

      <div className="glass border-purple-500/20 rounded-2xl p-5 mb-5 text-center">
        <div className="text-3xl mb-1">{current.icon}</div>
        <div className="font-display font-bold text-zinc-100">{current.name}</div>
        <div className="text-xs text-zinc-500">{current.description}</div>
        <div className="text-xs text-purple-400 mt-1">{viral.referralCount} referrals · {viral.questionIds.length} questions</div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mb-5">
        {ROLE_DEFINITIONS.map((role) => {
          const active = viral.role === role.id;
          const passed = ROLE_DEFINITIONS.findIndex((r) => r.id === viral.role) >= ROLE_DEFINITIONS.findIndex((r) => r.id === role.id);
          return (
            <div
              key={role.id}
              className={`rounded-xl border p-3 text-center transition-colors ${
                active
                  ? "border-purple-500/40 bg-purple-500/10"
                  : passed
                    ? "border-emerald-500/20 opacity-80"
                    : "border-white/[0.06] opacity-40"
              }`}
            >
              <div className="text-xl">{role.icon}</div>
              <div className="text-sm font-semibold text-zinc-200">{role.name}</div>
              <div className="text-[10px] text-zinc-500">{role.requirement}</div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 glass rounded-xl p-3">
        <code className="flex-1 text-xs truncate text-zinc-400">{viral.referralCode}</code>
        <button onClick={copyRef} className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
          {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Referral link</>}
        </button>
      </div>
      <p className="text-[10px] text-zinc-600 mt-2">Share your link — earn Advocate role at 3 verified referrals</p>
    </section>
  );
}
