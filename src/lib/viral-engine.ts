import { UserProfile, Badge } from "./types";

const STORAGE_KEY = "riverside-daily-user";

export const FACEBOOK_PAGE_URL = "https://www.facebook.com/riversidedaily";

const BADGES: Badge[] = [
  { id: "facebook-follower", name: "Facebook Follower", description: "Followed Riverside Daily on Facebook", icon: "👍" },
  { id: "investigator", name: "Investigator", description: "Unlocked an exclusive investigation", icon: "🔍" },
  { id: "insider", name: "Insider", description: "Unlocked all exclusive content", icon: "💎" },
  { id: "community-member", name: "Community Member", description: "Joined the Riverside Daily community", icon: "🏘️" },
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
  };
}

function normalizeProfile(raw: Record<string, unknown>): UserProfile {
  const base = createDefaultProfile();
  return {
    id: typeof raw.id === "string" ? raw.id : base.id,
    name: typeof raw.name === "string" ? raw.name : base.name,
    followedFacebook: Boolean(raw.followedFacebook),
    followedAt: typeof raw.followedAt === "string" ? raw.followedAt : undefined,
    unlockedContent: Array.isArray(raw.unlockedContent) ? (raw.unlockedContent as string[]) : [],
    earnedBadges: Array.isArray(raw.earnedBadges) ? (raw.earnedBadges as string[]) : [],
  };
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function confirmFacebookFollow(contentId?: string): UserProfile {
  const profile = loadProfile();

  profile.followedFacebook = true;
  profile.followedAt = profile.followedAt ?? new Date().toISOString();

  if (contentId && !profile.unlockedContent.includes(contentId)) {
    profile.unlockedContent.push(contentId);
  }

  checkBadges(profile);
  saveProfile(profile);
  return profile;
}

function checkBadges(profile: UserProfile): void {
  const earned = new Set(profile.earnedBadges);

  if (profile.followedFacebook) {
    earned.add("facebook-follower");
    earned.add("community-member");
  }
  if (profile.unlockedContent.length >= 1) earned.add("investigator");
  if (profile.followedFacebook && profile.unlockedContent.length >= 3) earned.add("insider");

  profile.earnedBadges = Array.from(earned);
}

export function isContentUnlocked(profile: UserProfile, tier: string): boolean {
  if (tier === "free") return true;
  return profile.followedFacebook;
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
