import { UserProfile, ShareEvent, Badge } from "./types";
import { getRewardTier } from "./data";

const STORAGE_KEY = "riverside-daily-user";
const SHARES_KEY = "riverside-daily-shares";

const BADGES: Badge[] = [
  { id: "first-share", name: "First Share", description: "Shared your first story", icon: "📢" },
  { id: "viral-starter", name: "Viral Starter", description: "Shared 5 stories", icon: "🚀" },
  { id: "community-voice", name: "Community Voice", description: "Shared 15 stories", icon: "📣" },
  { id: "referral-champion", name: "Referral Champion", description: "Referred 3 new readers", icon: "🤝" },
  { id: "streak-3", name: "3-Day Streak", description: "Shared 3 days in a row", icon: "🔥" },
  { id: "streak-7", name: "Week Warrior", description: "Shared 7 days in a row", icon: "⚡" },
  { id: "investigator", name: "Investigator", description: "Unlocked an investigation", icon: "🔍" },
  { id: "insider", name: "Insider", description: "Reached Insider tier", icon: "💎" },
];

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "RD-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function generateUserId(): string {
  return "user_" + Math.random().toString(36).substring(2, 11);
}

export function createDefaultProfile(): UserProfile {
  return {
    id: generateUserId(),
    name: "Reader",
    referralCode: generateReferralCode(),
    points: 0,
    totalShares: 0,
    totalReferrals: 0,
    unlockedContent: [],
    earnedBadges: [],
    shareStreak: 0,
  };
}

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return createDefaultProfile();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UserProfile;
  } catch {
    /* ignore */
  }
  return createDefaultProfile();
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function loadShareEvents(): ShareEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(SHARES_KEY);
    if (stored) return JSON.parse(stored) as ShareEvent[];
  } catch {
    /* ignore */
  }
  return [];
}

export function saveShareEvent(event: ShareEvent): void {
  if (typeof window === "undefined") return;
  const events = loadShareEvents();
  events.push(event);
  localStorage.setItem(SHARES_KEY, JSON.stringify(events));
}

export function getShareUrl(referralCode: string, contentSlug: string): string {
  if (typeof window === "undefined") {
    return `https://riversidedaily.local/${contentSlug}?ref=${referralCode}`;
  }
  const base = window.location.origin;
  return `${base}/${contentSlug}?ref=${referralCode}`;
}

export function processReferral(refCode: string): UserProfile {
  const profile = loadProfile();
  if (refCode && refCode !== profile.referralCode) {
    const stored = localStorage.getItem(`ref-${refCode}`);
    if (!stored) {
      localStorage.setItem(`ref-${refCode}`, "claimed");
      profile.points += 50;
      profile.totalReferrals += 1;
      checkBadges(profile);
      saveProfile(profile);
    }
  }
  return profile;
}

export function recordShare(
  contentId: string,
  platform: ShareEvent["platform"],
  shareReward: number
): UserProfile {
  const profile = loadProfile();
  const today = new Date().toISOString().split("T")[0];

  profile.points += shareReward;
  profile.totalShares += 1;

  if (profile.lastShareDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    if (profile.lastShareDate === yesterdayStr) {
      profile.shareStreak += 1;
    } else if (profile.lastShareDate !== today) {
      profile.shareStreak = 1;
    }
  } else {
    profile.shareStreak = 1;
  }
  profile.lastShareDate = today;

  if (!profile.unlockedContent.includes(contentId)) {
    profile.unlockedContent.push(contentId);
  }

  checkBadges(profile);
  saveProfile(profile);

  saveShareEvent({
    contentId,
    platform,
    timestamp: new Date().toISOString(),
    referralCode: profile.referralCode,
  });

  return profile;
}

function checkBadges(profile: UserProfile): void {
  const earned = new Set(profile.earnedBadges);

  if (profile.totalShares >= 1) earned.add("first-share");
  if (profile.totalShares >= 5) earned.add("viral-starter");
  if (profile.totalShares >= 15) earned.add("community-voice");
  if (profile.totalReferrals >= 3) earned.add("referral-champion");
  if (profile.shareStreak >= 3) earned.add("streak-3");
  if (profile.shareStreak >= 7) earned.add("streak-7");

  const tier = getRewardTier(profile.points);
  if (tier.id === "insider") earned.add("insider");

  profile.earnedBadges = Array.from(earned);
}

export function isContentUnlocked(
  profile: UserProfile,
  contentId: string,
  tier: string,
  unlockRequirement?: { type: string; count: number }
): boolean {
  if (tier === "free") return true;
  if (profile.unlockedContent.includes(contentId)) return true;

  if (tier === "premium" && unlockRequirement?.type === "points") {
    return profile.points >= unlockRequirement.count;
  }

  if (tier === "share-unlock") return profile.unlockedContent.includes(contentId);

  return false;
}

export function getBadgeInfo(badgeId: string): Badge | undefined {
  return BADGES.find((b) => b.id === badgeId);
}

export function getAllBadges(): Badge[] {
  return BADGES;
}

export function getSharesForContent(contentId: string): number {
  return loadShareEvents().filter((e) => e.contentId === contentId).length;
}

export function getUnlockedBonusCount(profile: UserProfile, parentId: string, unlockShares: number): boolean {
  const contentShares = loadShareEvents().filter((e) => e.contentId === parentId).length;
  return contentShares >= unlockShares || profile.unlockedContent.includes(parentId);
}
