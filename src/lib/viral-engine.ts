import { UserProfile, Badge } from "./types";
import { FACEBOOK_PAGE_URL } from "./facebook-config";
import {
  createDefaultViralProfile,
  normalizeViralProfile,
  onVerifiedFollow,
  processReferral,
  creditReferrerOnVerify,
  loadCommunity,
} from "./viral/engine";

import { SITE_NAME } from "./brand";

const STORAGE_KEY = "mitchel-turner-user";

export { FACEBOOK_PAGE_URL };

const BADGES: Badge[] = [
  { id: "facebook-follower", name: "Facebook Follower", description: `Verified follower of ${SITE_NAME} on Facebook`, icon: "👍" },
  { id: "investigator", name: "Investigator", description: "Unlocked an exclusive investigation", icon: "🔍" },
  { id: "insider", name: "Insider", description: "Unlocked all exclusive content", icon: "💎" },
  { id: "community-member", name: "Community Member", description: `Joined the ${SITE_NAME} community`, icon: "🏘️" },
  { id: "scout", name: "Scout", icon: "🔭", description: "Submitted a local question that shaped coverage" },
  { id: "witness", name: "Witness", icon: "📸", description: "Checked in at a partner business" },
  { id: "advocate", name: "Advocate", icon: "📣", description: "Recruited 3+ verified followers" },
  { id: "zone-champion", name: "Zone Champion", icon: "🗺️", description: "Helped unlock your neighborhood" },
  { id: "informed", name: "Informed Citizen", icon: "📋", description: "Generated an accountability receipt" },
];

function generateUserId(): string {
  return "user_" + Math.random().toString(36).substring(2, 11);
}

export function createDefaultProfile(): UserProfile {
  return {
    id: generateUserId(),
    name: "Reader",
    followedFacebook: false,
    unlockedContent: [],
    earnedBadges: [],
    viral: createDefaultViralProfile(),
  };
}

function normalizeProfile(raw: Record<string, unknown>): UserProfile {
  const base = createDefaultProfile();
  const profile: UserProfile = {
    id: typeof raw.id === "string" ? raw.id : base.id,
    name: typeof raw.name === "string" ? raw.name : base.name,
    followedFacebook: Boolean(raw.followedFacebook),
    followedAt: typeof raw.followedAt === "string" ? raw.followedAt : undefined,
    facebookUserId: typeof raw.facebookUserId === "string" ? raw.facebookUserId : undefined,
    facebookName: typeof raw.facebookName === "string" ? raw.facebookName : undefined,
    unlockedContent: Array.isArray(raw.unlockedContent) ? (raw.unlockedContent as string[]) : [],
    earnedBadges: Array.isArray(raw.earnedBadges) ? (raw.earnedBadges as string[]) : [],
    viral: normalizeViralProfile(raw.viral as Record<string, unknown> | undefined),
  };
  const community = loadCommunity();
  if (profile.viral) {
    profile.viral.referralCount = community.referralCounts[profile.viral.referralCode] ?? profile.viral.referralCount;
  }
  return profile;
}

export function getViral(profile: UserProfile) {
  return profile.viral ?? createDefaultViralProfile();
}

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return createDefaultProfile();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return normalizeProfile(JSON.parse(stored) as Record<string, unknown>);
  } catch {
    /* ignore */
  }
  return createDefaultProfile();
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  if (!profile.viral) profile.viral = createDefaultViralProfile();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function applyVerifiedFacebookFollow(
  facebookUserId: string,
  facebookName: string | undefined,
  contentId?: string,
  referrerCode?: string
): UserProfile {
  const profile = loadProfile();
  const viral = getViral(profile);

  profile.followedFacebook = true;
  profile.followedAt = profile.followedAt ?? new Date().toISOString();
  profile.facebookUserId = facebookUserId;
  if (facebookName) {
    profile.facebookName = facebookName;
    profile.name = facebookName;
  }

  if (contentId && contentId !== "follow" && !profile.unlockedContent.includes(contentId)) {
    profile.unlockedContent.push(contentId);
  }

  if (referrerCode && referrerCode !== viral.referralCode) {
    viral.referredBy = referrerCode;
    creditReferrerOnVerify(referrerCode, profile.name);
  }

  profile.viral = viral;
  const result = onVerifiedFollow(profile, viral, referrerCode);
  checkBadges(result.profile, result.viral);
  result.profile.viral = result.viral;
  saveProfile(result.profile);
  return result.profile;
}

export function handleReferralOnLoad(refCode: string): UserProfile {
  const profile = loadProfile();
  const viral = getViral(profile);
  viral.referredBy = refCode;
  profile.viral = viral;
  saveProfile(profile);
  return profile;
}

function checkBadges(profile: UserProfile, viral = getViral(profile)): void {
  const earned = new Set(profile.earnedBadges);

  if (profile.followedFacebook && profile.facebookUserId) {
    earned.add("facebook-follower");
    earned.add("community-member");
  }
  if (profile.unlockedContent.length >= 1) earned.add("investigator");
  if (profile.followedFacebook && profile.unlockedContent.length >= 3) earned.add("insider");
  if (viral.questionIds.length >= 1) earned.add("scout");
  if (viral.businessCheckIns.length >= 1) earned.add("witness");
  if (viral.referralCount >= 3) earned.add("advocate");
  if (viral.zonesJoined.length >= 1) earned.add("zone-champion");
  if (viral.informedReceipts.length >= 1) earned.add("informed");

  profile.earnedBadges = Array.from(earned);
}

export function isContentUnlocked(profile: UserProfile, tier: string): boolean {
  if (tier === "free") return true;
  return profile.followedFacebook && Boolean(profile.facebookUserId);
}

export function getBadgeInfo(badgeId: string): Badge | undefined {
  return BADGES.find((b) => b.id === badgeId);
}

export function getAllBadges(): Badge[] {
  return BADGES;
}

export function openFacebookPage(): void {
  window.open(FACEBOOK_PAGE_URL, "_blank", "noopener,noreferrer");
}
