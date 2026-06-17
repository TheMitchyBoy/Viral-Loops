"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { openFacebookPage } from "@/lib/viral-engine";
import { SITE_NAME } from "@/lib/brand";
import { FACEBOOK_PAGE_URL } from "@/lib/facebook-config";
import { useFacebookSDK } from "@/lib/facebook-client";
import { Facebook, X, Check, Lock, ExternalLink, AlertCircle, Loader2 } from "lucide-react";

export default function FollowModal() {
  const {
    profile,
    verifyAndUnlock,
    showFollowModal,
    setShowFollowModal,
    followTarget,
    facebookConfigured,
  } = useUser();
  const { ready: sdkReady } = useFacebookSDK();
  const [justFollowed, setJustFollowed] = useState(false);
  const [openedFacebook, setOpenedFacebook] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!showFollowModal || !followTarget) return null;

  const handleOpenFacebook = () => {
    openFacebookPage();
    setOpenedFacebook(true);
    setError(null);
  };

  const handleVerifyFollow = async () => {
    if (!facebookConfigured) {
      setError("Facebook verification is not configured for this site yet.");
      return;
    }
    if (!sdkReady) {
      setError("Facebook login is still loading. Please try again in a moment.");
      return;
    }
    setVerifying(true);
    setError(null);
    try {
      await verifyAndUnlock(followTarget.id);
      setJustFollowed(true);
      setTimeout(() => {
        setShowFollowModal(false);
        setJustFollowed(false);
        setOpenedFacebook(false);
        setError(null);
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const closeModal = () => {
    setShowFollowModal(false);
    setError(null);
    setOpenedFacebook(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={closeModal} />
      <div className="relative glass-strong rounded-3xl w-full sm:max-w-md p-6 md:p-8 animate-slide-up shadow-2xl shadow-cyan-500/5 ring-1 ring-white/10">
        <button onClick={closeModal} className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors">
          <X className="w-5 h-5" />
        </button>

        {justFollowed ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 flex items-center justify-center mx-auto mb-5 ring-1 ring-cyan-400/30">
              <Check className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Follow Verified</h3>
            <p className="text-zinc-500 text-sm">Exclusive content is now unlocked.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#1877F2]/20 flex items-center justify-center ring-1 ring-[#1877F2]/30">
                <Facebook className="w-5 h-5 text-[#1877F2]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Follow to Unlock</h3>
                <p className="text-sm text-zinc-500">Verified via Facebook login</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-4 mb-5">
              <div className="flex items-start gap-2 mb-2">
                <Lock className="w-4 h-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-zinc-300 line-clamp-2">{followTarget.title}</p>
              </div>
              <p className="text-xs text-zinc-500">
                Follow {SITE_NAME} on Facebook, then verify with login to unlock.
              </p>
            </div>

            <ol className="text-sm text-zinc-400 space-y-2 mb-6 list-decimal list-inside">
              <li>Open our Facebook page and tap Follow</li>
              <li>Return here and verify with Facebook login</li>
            </ol>

            <div className="space-y-3">
              <button onClick={handleOpenFacebook} className="w-full btn-facebook !rounded-2xl">
                <Facebook className="w-5 h-5" />
                {openedFacebook ? "Open Facebook Again" : "Step 1: Follow on Facebook"}
                <ExternalLink className="w-4 h-4 opacity-70" />
              </button>
              <button
                onClick={handleVerifyFollow}
                disabled={verifying || !facebookConfigured || (!openedFacebook && !profile.followedFacebook)}
                className="w-full btn-secondary !rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed border-cyan-400/30 text-cyan-300"
              >
                {verifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Facebook className="w-5 h-5" />
                    Step 2: Verify with Facebook
                  </>
                )}
              </button>
            </div>

            {!facebookConfigured && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Facebook App ID and Page ID must be configured.</span>
              </div>
            )}
            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            <p className="text-[11px] text-zinc-600 mt-4 text-center">
              Secure Graph API verification · {FACEBOOK_PAGE_URL.replace("https://www.", "")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
