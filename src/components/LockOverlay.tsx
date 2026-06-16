"use client";

import { Lock, Facebook, Star } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface LockOverlayProps {
  contentId: string;
  slug: string;
  title: string;
}

export default function LockOverlay({ contentId, slug, title }: LockOverlayProps) {
  const { setFollowTarget, setShowFollowModal } = useUser();

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white z-10" />
      <div className="relative z-20 -mt-32 pb-8">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-stone-200 p-8 text-center animate-slide-up">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-blue-600" />
          </div>

          <h3 className="text-xl font-bold text-stone-900 mb-2">Follow to Unlock</h3>
          <p className="text-stone-500 text-sm mb-6">
            Follow Riverside Daily on Facebook to access this exclusive story and all bonus content.
          </p>

          <div className="flex items-center justify-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1.5 text-blue-600">
              <Facebook className="w-4 h-4" />
              <span className="font-semibold">Free to follow</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-600">
              <Star className="w-4 h-4" />
              <span className="font-semibold">Bonus content</span>
            </div>
          </div>

          <button
            onClick={() => {
              setFollowTarget({ id: contentId, slug, title });
              setShowFollowModal(true);
            }}
            className="w-full bg-[#1877F2] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#166FE5] transition-colors flex items-center justify-center gap-2"
          >
            <Facebook className="w-5 h-5" />
            Follow on Facebook to Unlock
          </button>

          <p className="text-xs text-stone-400 mt-4">
            One follow unlocks all exclusive articles, videos, and investigations
          </p>
        </div>
      </div>
    </div>
  );
}
