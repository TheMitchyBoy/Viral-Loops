"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { UserProfile } from "@/lib/types";
import {
  loadProfile,
  saveProfile,
  processReferral,
  recordShare,
  isContentUnlocked,
} from "@/lib/viral-engine";

interface UserContextType {
  profile: UserProfile;
  refreshProfile: () => void;
  shareContent: (contentId: string, platform: "twitter" | "facebook" | "whatsapp" | "email" | "copy", reward: number) => UserProfile;
  checkUnlocked: (contentId: string, tier: string, unlockRequirement?: { type: string; count: number }) => boolean;
  showShareModal: boolean;
  setShowShareModal: (show: boolean) => void;
  shareTarget: { id: string; slug: string; title: string; reward: number } | null;
  setShareTarget: (target: { id: string; slug: string; title: string; reward: number } | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareTarget, setShareTarget] = useState<{
    id: string;
    slug: string;
    title: string;
    reward: number;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    let p = loadProfile();
    if (ref) {
      p = processReferral(ref);
    }
    setProfile(p);
  }, []);

  const refreshProfile = useCallback(() => {
    setProfile(loadProfile());
  }, []);

  const shareContent = useCallback(
    (contentId: string, platform: "twitter" | "facebook" | "whatsapp" | "email" | "copy", reward: number) => {
      const updated = recordShare(contentId, platform, reward);
      setProfile(updated);
      return updated;
    },
    []
  );

  const checkUnlocked = useCallback(
    (contentId: string, tier: string, unlockRequirement?: { type: string; count: number }) => {
      if (!profile) return tier === "free";
      return isContentUnlocked(profile, contentId, tier, unlockRequirement);
    },
    [profile]
  );

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-pulse text-stone-400">Loading...</div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        refreshProfile,
        shareContent,
        checkUnlocked,
        showShareModal,
        setShowShareModal,
        shareTarget,
        setShareTarget,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
