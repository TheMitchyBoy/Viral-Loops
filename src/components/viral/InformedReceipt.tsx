"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { getViral } from "@/lib/viral-engine";
import { FileCheck, Share2, Copy, Check } from "lucide-react";

interface InformedReceiptProps {
  storyId: string;
  storyTitle: string;
}

export default function InformedReceipt({ storyId, storyTitle }: InformedReceiptProps) {
  const { profile, createReceipt } = useUser();
  const viral = getViral(profile);
  const [copied, setCopied] = useState(false);
  const hasReceipt = viral.informedReceipts.includes(storyId);
  const verified = profile.followedFacebook && profile.facebookUserId;

  if (!verified) return null;

  const receiptText = `I'm an informed Riverside resident. I read the full report: "${storyTitle}" — ask me what officials aren't saying. Verified via Riverside Daily · ${new Date().toLocaleDateString()}`;

  const generate = () => {
    createReceipt(storyId, storyTitle);
  };

  const share = () => {
    navigator.clipboard.writeText(receiptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (!hasReceipt) generate();
  };

  return (
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 my-6">
      <div className="flex items-center gap-2 mb-2">
        <FileCheck className="w-5 h-5 text-emerald-700" />
        <h3 className="font-bold text-stone-900">Civic Accountability Receipt</h3>
      </div>
      <p className="text-sm text-stone-600 mb-4">
        Generate a shareable card proving you read the full story — not the headline, the full report.
      </p>

      <div className="bg-white border-2 border-dashed border-emerald-300 rounded-xl p-5 mb-4 text-center">
        <div className="text-2xl mb-2">📋</div>
        <div className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-2">Informed Citizen</div>
        <p className="text-sm text-stone-800 font-medium mb-1">{profile.facebookName ?? profile.name}</p>
        <p className="text-xs text-stone-500 line-clamp-2">{storyTitle}</p>
        <p className="text-[10px] text-stone-400 mt-2">Riverside Daily · Verified Reader</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={share}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-2.5 rounded-xl hover:bg-emerald-700 text-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          {copied ? "Copied!" : "Share Receipt"}
        </button>
        <button
          onClick={() => { generate(); share(); }}
          className="flex items-center gap-2 border border-emerald-300 text-emerald-700 px-4 py-2.5 rounded-xl text-sm hover:bg-emerald-50"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      {hasReceipt && <p className="text-xs text-emerald-600 mt-2">Receipt saved to your profile</p>}
    </section>
  );
}
