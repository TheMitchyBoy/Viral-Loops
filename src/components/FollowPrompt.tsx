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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-8">
        <p className="text-sm text-blue-800">
          <strong>Thanks for following!</strong> You have full access to exclusive Riverside Daily content on Facebook.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-brand-50 border border-blue-200 rounded-xl p-5 my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-stone-900 mb-1">Want more stories like this?</h3>
          <p className="text-sm text-stone-600">
            Follow Riverside Daily on Facebook to unlock exclusive investigations, bonus videos, and insider previews.
          </p>
        </div>
        <button
          onClick={() => {
            setFollowTarget({ id: contentId, slug, title });
            setShowFollowModal(true);
          }}
          className="flex items-center gap-2 bg-[#1877F2] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#166FE5] transition-colors whitespace-nowrap"
        >
          <Facebook className="w-4 h-4" />
          Follow to Unlock
        </button>
      </div>
    </div>
  );
}
