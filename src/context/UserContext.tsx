"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { UserProfile } from "@/lib/types";
import { CommunityState } from "@/lib/viral/types";
import {
  loadProfile,
  applyVerifiedFacebookFollow,
  isContentUnlocked,
  getViral,
  handleReferralOnLoad,
  saveProfile,
} from "@/lib/viral-engine";
import {
  loadCommunity,
  submitQuestion,
  castVote,
  businessCheckIn,
  setZipCode,
  setAlumniYear,
  generateInformedReceipt,
} from "@/lib/viral/engine";
import { loginWithFacebook, verifyFacebookFollow } from "@/lib/facebook-client";
import { isFacebookClientConfigured } from "@/lib/facebook-config";

interface FollowTarget {
  id: string;
  slug: string;
  title: string;
}

interface UserContextType {
  profile: UserProfile;
  community: CommunityState;
  refreshAll: () => void;
  verifyAndUnlock: (contentId?: string) => Promise<void>;
  checkUnlocked: (tier: string) => boolean;
  facebookConfigured: boolean;
  showFollowModal: boolean;
  setShowFollowModal: (show: boolean) => void;
  followTarget: FollowTarget | null;
  setFollowTarget: (target: FollowTarget | null) => void;
  submitLocalQuestion: (storyId: string, text: string) => void;
  vote: (pollId: string, optionId: string) => void;
  checkIn: (partnerId: string) => void;
  updateZip: (zip: string) => void;
  updateAlumniYear: (year: string) => void;
  createReceipt: (storyId: string, storyTitle: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [community, setCommunity] = useState<CommunityState | null>(null);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followTarget, setFollowTarget] = useState<FollowTarget | null>(null);
  const [pendingRef, setPendingRef] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    let p = loadProfile();
    if (ref) {
      p = handleReferralOnLoad(ref);
      setPendingRef(ref);
    }
    setProfile(p);
    setCommunity(loadCommunity());
  }, []);

  const refreshAll = useCallback(() => {
    setProfile(loadProfile());
    setCommunity(loadCommunity());
  }, []);

  const verifyAndUnlock = useCallback(
    async (contentId?: string) => {
      const accessToken = await loginWithFacebook();
      const result = await verifyFacebookFollow(accessToken);
      if (!result.userId) throw new Error("Facebook verification did not return a user ID");

      const updated = applyVerifiedFacebookFollow(
        result.userId,
        result.name,
        contentId,
        pendingRef ?? getViral(loadProfile()).referredBy
      );

      setProfile(updated);
      setCommunity(loadCommunity());
    },
    [pendingRef]
  );

  const submitLocalQuestion = useCallback(
    (storyId: string, text: string) => {
      const p = loadProfile();
      const viral = getViral(p);
      const { profile: updated, community: c } = submitQuestion(p, viral, storyId, text);
      setProfile(updated);
      setCommunity(c);
    },
    []
  );

  const vote = useCallback((pollId: string, optionId: string) => {
    const p = loadProfile();
    const viral = getViral(p);
    setProfile(castVote(p, viral, pollId, optionId));
    setCommunity(loadCommunity());
  }, []);

  const checkIn = useCallback((partnerId: string) => {
    const p = loadProfile();
    const viral = getViral(p);
    setProfile(businessCheckIn(p, viral, partnerId));
    refreshAll();
  }, [refreshAll]);

  const updateZip = useCallback((zip: string) => {
    const p = loadProfile();
    const viral = getViral(p);
    setProfile(setZipCode(p, viral, zip));
  }, []);

  const updateAlumniYear = useCallback((year: string) => {
    const p = loadProfile();
    const viral = getViral(p);
    setProfile(setAlumniYear(p, viral, year));
    setCommunity(loadCommunity());
  }, []);

  const createReceipt = useCallback((storyId: string, storyTitle: string) => {
    const p = loadProfile();
    const viral = getViral(p);
    setProfile(generateInformedReceipt(p, viral, storyId, storyTitle));
  }, []);

  const checkUnlocked = useCallback(
    (tier: string) => {
      if (!profile) return tier === "free";
      return isContentUnlocked(profile, tier);
    },
    [profile]
  );

  if (!profile || !community) {
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
        community,
        refreshAll,
        verifyAndUnlock,
        checkUnlocked,
        facebookConfigured: isFacebookClientConfigured(),
        showFollowModal,
        setShowFollowModal,
        followTarget,
        setFollowTarget,
        submitLocalQuestion,
        vote,
        checkIn,
        updateZip,
        updateAlumniYear,
        createReceipt,
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

export function useViral() {
  const { profile, community } = useUser();
  return { viral: getViral(profile), profile, community };
}
