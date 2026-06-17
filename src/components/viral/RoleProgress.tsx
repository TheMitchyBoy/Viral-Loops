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
    <section className="bg-white border border-stone-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-bold text-stone-900">Community Roles</h2>
      </div>
      <p className="text-sm text-stone-500 mb-4">
        Level up from Reader to Insider by participating in local news loops.
      </p>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-5 text-center">
        <div className="text-3xl mb-1">{current.icon}</div>
        <div className="font-bold text-stone-900">{current.name}</div>
        <div className="text-xs text-stone-500">{current.description}</div>
        <div className="text-xs text-purple-600 mt-1">{viral.referralCount} referrals · {viral.questionIds.length} questions</div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mb-5">
        {ROLE_DEFINITIONS.map((role) => {
          const active = viral.role === role.id;
          const passed = ROLE_DEFINITIONS.findIndex((r) => r.id === viral.role) >= ROLE_DEFINITIONS.findIndex((r) => r.id === role.id);
          return (
            <div
              key={role.id}
              className={`rounded-lg border p-3 text-center ${active ? "border-purple-300 bg-purple-50" : passed ? "border-emerald-200 opacity-80" : "border-stone-200 opacity-50"}`}
            >
              <div className="text-xl">{role.icon}</div>
              <div className="text-sm font-semibold">{role.name}</div>
              <div className="text-[10px] text-stone-500">{role.requirement}</div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 bg-stone-50 rounded-lg p-3">
        <code className="flex-1 text-xs truncate">{viral.referralCode}</code>
        <button onClick={copyRef} className="flex items-center gap-1 text-xs font-semibold text-brand-600">
          {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Referral link</>}
        </button>
      </div>
      <p className="text-[10px] text-stone-400 mt-2">Share your link — earn Advocate role at 3 verified referrals</p>
    </section>
  );
}
