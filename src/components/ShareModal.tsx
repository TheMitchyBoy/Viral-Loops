"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { getShareUrl } from "@/lib/viral-engine";
import { Share2, Twitter, Facebook, MessageCircle, Mail, Link2, Check, X, Gift } from "lucide-react";

export default function ShareModal() {
  const { profile, shareContent, showShareModal, setShowShareModal, shareTarget } = useUser();
  const [copied, setCopied] = useState(false);
  const [justShared, setJustShared] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  if (!showShareModal || !shareTarget) return null;

  const shareUrl = getShareUrl(profile.referralCode, shareTarget.slug);
  const shareText = `${shareTarget.title} — via Riverside Daily`;

  const handleShare = (platform: "twitter" | "facebook" | "whatsapp" | "email" | "copy") => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }

    const updated = shareContent(shareTarget.id, platform, shareTarget.reward);
    setEarnedPoints(shareTarget.reward);
    setJustShared(true);
    setTimeout(() => setJustShared(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowShareModal(false)}
      />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 animate-slide-up shadow-2xl">
        <button
          onClick={() => setShowShareModal(false)}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        {justShared ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">+{earnedPoints} Points Earned!</h3>
            <p className="text-stone-500 text-sm">
              Thanks for sharing! You&apos;ve unlocked bonus content and moved closer to the next reward tier.
            </p>
            <p className="text-xs text-stone-400 mt-3">
              Total: {profile.points + earnedPoints} points · {profile.totalShares + 1} shares
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                <Share2 className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900">Share & Earn Rewards</h3>
                <p className="text-sm text-stone-500">Earn +{shareTarget.reward} points for sharing</p>
              </div>
            </div>

            <p className="text-sm text-stone-600 mb-4 line-clamp-2 bg-stone-50 p-3 rounded-lg">
              {shareTarget.title}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors text-sm font-medium"
              >
                <Twitter className="w-4 h-4 text-sky-500" /> Twitter / X
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors text-sm font-medium"
              >
                <Facebook className="w-4 h-4 text-blue-600" /> Facebook
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
              </button>
              <button
                onClick={() => handleShare("email")}
                className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4 text-stone-500" /> Email
              </button>
            </div>

            <div className="flex items-center gap-2 bg-stone-50 rounded-xl p-3">
              <Link2 className="w-4 h-4 text-stone-400 flex-shrink-0" />
              <input
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent text-xs text-stone-600 outline-none truncate"
              />
              <button
                onClick={() => handleShare("copy")}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" /> Copied
                  </>
                ) : (
                  "Copy"
                )}
              </button>
            </div>

            <p className="text-[11px] text-stone-400 mt-3 text-center">
              Your referral code: <strong>{profile.referralCode}</strong> — earn 50 pts when friends join via your link
            </p>
          </>
        )}
      </div>
    </div>
  );
}
