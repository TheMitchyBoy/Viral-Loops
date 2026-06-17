"use client";

import { Facebook } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface FollowPromptProps {
  contentId: string;
  slug: string;
  title: string;
}

export default function FollowPrompt({ contentId, slug, title }: FollowPromptProps) {
  const { profile, setFollowTarget, setShowFollowModal } = useUser();

  if (profile.followedFacebook && profile.facebookUserId) {
    return (
      <div className="card p-5 my-8 border-cyan-400/20 bg-cyan-400/5">
        <p className="text-sm text-cyan-200/90">
          <strong className="text-cyan-300">Verified follower</strong> — you have full access to exclusive Riverside Daily content.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-5 md:p-6 my-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-rose-500/5 pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="label-caps text-cyan-400/70 mb-1">Exclusive access</p>
          <h3 className="font-display font-bold text-zinc-100 mb-1">Want more stories like this?</h3>
          <p className="text-sm text-zinc-500">
            Verify your Facebook follow to unlock investigations, bonus videos, and insider previews.
          </p>
        </div>
        <button
          onClick={() => {
            setFollowTarget({ id: contentId, slug, title });
            setShowFollowModal(true);
          }}
          className="btn-facebook whitespace-nowrap flex-shrink-0"
        >
          <Facebook className="w-4 h-4" />
          Follow to Unlock
        </button>
      </div>
    </div>
  );
}
