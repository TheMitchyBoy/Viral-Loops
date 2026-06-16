"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { UserProfile } from "@/lib/types";
import { loadProfile, applyVerifiedFacebookFollow, isContentUnlocked } from "@/lib/viral-engine";
import { loginWithFacebook, verifyFacebookFollow } from "@/lib/facebook-client";
import { isFacebookClientConfigured } from "@/lib/facebook-config";

interface FollowTarget {
  id: string;
  slug: string;
  title: string;
}

interface UserContextType {
  profile: UserProfile;
  refreshProfile: () => void;
  verifyAndUnlock: (contentId?: string) => Promise<void>;
  checkUnlocked: (tier: string) => boolean;
  facebookConfigured: boolean;
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

  const verifyAndUnlock = useCallback(async (contentId?: string) => {
    const accessToken = await loginWithFacebook();
    const result = await verifyFacebookFollow(accessToken);

    if (!result.userId) {
      throw new Error("Facebook verification did not return a user ID");
    }

    const updated = applyVerifiedFacebookFollow(result.userId, result.name, contentId);
    setProfile(updated);
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
        verifyAndUnlock,
        checkUnlocked,
        facebookConfigured: isFacebookClientConfigured(),
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
