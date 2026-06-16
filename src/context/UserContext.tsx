"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { UserProfile } from "@/lib/types";
import { loadProfile, confirmFacebookFollow, isContentUnlocked } from "@/lib/viral-engine";

interface FollowTarget {
  id: string;
  slug: string;
  title: string;
}

interface UserContextType {
  profile: UserProfile;
  refreshProfile: () => void;
  confirmFollow: (contentId?: string) => UserProfile;
  checkUnlocked: (tier: string) => boolean;
  showFollowModal: boolean;
  setShowFollowModal: (show: boolean) => void;
  followTarget: FollowTarget | null;
  setFollowTarget: (target: FollowTarget | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followTarget, setFollowTarget] = useState<FollowTarget | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const refreshProfile = useCallback(() => {
    setProfile(loadProfile());
  }, []);

  const confirmFollow = useCallback((contentId?: string) => {
    const updated = confirmFacebookFollow(contentId);
    setProfile(updated);
    return updated;
  }, []);

  const checkUnlocked = useCallback(
    (tier: string) => {
      if (!profile) return tier === "free";
      return isContentUnlocked(profile, tier);
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
        confirmFollow,
        checkUnlocked,
        showFollowModal,
        setShowFollowModal,
        followTarget,
        setFollowTarget,
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
