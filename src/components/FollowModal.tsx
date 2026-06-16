"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { openFacebookPage } from "@/lib/viral-engine";
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
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 animate-slide-up shadow-2xl">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        {justFollowed ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Follow Verified!</h3>
            <p className="text-stone-500 text-sm">
              We confirmed your Facebook follow. Exclusive content is now unlocked.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Facebook className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900">Follow to Unlock</h3>
                <p className="text-sm text-stone-500">Verified via Facebook login</p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 mb-5">
              <div className="flex items-start gap-2 mb-2">
                <Lock className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-stone-700 line-clamp-2">{followTarget.title}</p>
              </div>
              <p className="text-xs text-stone-500">
                Follow Riverside Daily on Facebook, then log in so we can verify your follow before unlocking exclusive content.
              </p>
            </div>

            <ol className="text-sm text-stone-600 space-y-2 mb-5 list-decimal list-inside">
              <li>Open our Facebook page and tap Follow or Like</li>
              <li>Return here and verify with Facebook login</li>
            </ol>

            <div className="space-y-3">
              <button
                onClick={handleOpenFacebook}
                className="w-full bg-[#1877F2] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#166FE5] transition-colors flex items-center justify-center gap-2"
              >
                <Facebook className="w-5 h-5" />
                {openedFacebook ? "Open Facebook Page Again" : "Step 1: Follow on Facebook"}
                <ExternalLink className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={handleVerifyFollow}
                disabled={verifying || !facebookConfigured || (!openedFacebook && !profile.followedFacebook)}
                className="w-full border-2 border-[#1877F2] text-[#1877F2] font-semibold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {verifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying follow...
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
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Facebook App ID and Page ID must be configured before follow verification can run.
                </span>
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <p className="text-[11px] text-stone-400 mt-4 text-center">
              We check your Facebook likes/follows via secure login · {FACEBOOK_PAGE_URL.replace("https://www.", "")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
