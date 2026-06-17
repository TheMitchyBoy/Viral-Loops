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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950 z-10" />
      <div className="relative z-20 -mt-32 pb-8">
        <div className="max-w-lg mx-auto glass-strong rounded-3xl p-8 md:p-10 text-center animate-slide-up ring-1 ring-white/10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-rose-400/20 flex items-center justify-center mx-auto mb-5 ring-1 ring-cyan-400/20">
            <Lock className="w-7 h-7 text-cyan-400" />
          </div>

          <h3 className="font-display text-xl font-bold mb-2">Follow to Unlock</h3>
          <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
            Verify your Facebook follow to access this exclusive story and all bonus content.
          </p>

          <div className="flex items-center justify-center gap-6 mb-6 text-sm">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Facebook className="w-4 h-4" />
              <span className="font-medium">Free</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-400">
              <Star className="w-4 h-4" />
              <span className="font-medium">Bonus content</span>
            </div>
          </div>

          <button
            onClick={() => {
              setFollowTarget({ id: contentId, slug, title });
              setShowFollowModal(true);
            }}
            className="w-full btn-facebook !rounded-2xl"
          >
            <Facebook className="w-5 h-5" />
            Follow on Facebook to Unlock
          </button>

          <p className="text-xs text-zinc-600 mt-4">
            One verified follow unlocks all exclusive content
          </p>
        </div>
      </div>
    </div>
  );
}
