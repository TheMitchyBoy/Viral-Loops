"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { openFacebookPage, FACEBOOK_PAGE_URL } from "@/lib/viral-engine";
import { Facebook, X, Check, Lock, ExternalLink } from "lucide-react";

export default function FollowModal() {
  const { profile, confirmFollow, showFollowModal, setShowFollowModal, followTarget } = useUser();
  const [justFollowed, setJustFollowed] = useState(false);
  const [openedFacebook, setOpenedFacebook] = useState(false);

  if (!showFollowModal || !followTarget) return null;

  const handleOpenFacebook = () => {
    openFacebookPage();
    setOpenedFacebook(true);
  };

  const handleConfirmFollow = () => {
    confirmFollow(followTarget.id);
    setJustFollowed(true);
    setTimeout(() => {
      setShowFollowModal(false);
      setJustFollowed(false);
      setOpenedFacebook(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowFollowModal(false)}
      />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 animate-slide-up shadow-2xl">
        <button
          onClick={() => setShowFollowModal(false)}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-600"
        >
          <X className="w-5 h-5" />
        </button>

        {justFollowed ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">You&apos;re In!</h3>
            <p className="text-stone-500 text-sm">
              Thanks for following Riverside Daily on Facebook. Exclusive content is now unlocked.
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
                <p className="text-sm text-stone-500">Free access to exclusive local news</p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 mb-5">
              <div className="flex items-start gap-2 mb-2">
                <Lock className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-stone-700 line-clamp-2">{followTarget.title}</p>
              </div>
              <p className="text-xs text-stone-500">
                Follow Riverside Daily on Facebook to unlock this story, bonus videos, investigations, and all exclusive content.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleOpenFacebook}
                className="w-full bg-[#1877F2] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#166FE5] transition-colors flex items-center justify-center gap-2"
              >
                <Facebook className="w-5 h-5" />
                Follow on Facebook
                <ExternalLink className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={handleConfirmFollow}
                disabled={!openedFacebook && !profile.followedFacebook}
                className="w-full border-2 border-stone-200 text-stone-700 font-semibold py-3 px-6 rounded-xl hover:bg-stone-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {openedFacebook || profile.followedFacebook ? "I've Followed — Unlock Content" : "Follow first, then confirm here"}
              </button>
            </div>

            <p className="text-[11px] text-stone-400 mt-4 text-center">
              One follow unlocks all exclusive stories · {FACEBOOK_PAGE_URL.replace("https://www.", "")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
