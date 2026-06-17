import { UserProfile } from "../types";
import { ViralProfile, CommunityState, UserRole } from "./types";
import {
  NEIGHBORHOOD_ZONES,
  RECRUITMENT_CAMPAIGN,
  SCARCITY_DROP,
  MYSTERY_SERIAL,
  ROLE_DEFINITIONS,
  QUESTION_UNLOCK_THRESHOLD,
  getZoneByZip,
} from "./data";

const COMMUNITY_KEY = "mitchel-turner-community";
const DEFAULT_COMMUNITY: CommunityState = {
  zoneFollowers: { "oak-street": 11, "creek-view": 7, "school-district": 16, "maple-row": 9, "central-park": 5 },
  globalVerifiedFollows: 347,
  questions: [],
  pollVotes: { "poll-contamination": { publish: 89, redact: 42, wait: 31 } },
  scarcityClaimed: 143,
  storyCredits: [
    { userId: "demo1", name: "Maria G.", storyId: "3", readersReached: 47 },
    { userId: "demo2", name: "David K.", storyId: "3", readersReached: 31 },
    { userId: "demo3", name: "Jennifer L.", storyId: "7", readersReached: 28 },
  ],
  alumniCounts: { "2003": 34, "2008": 52, "2015": 41, "2026": 67 },
  referralCounts: {},
};

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "MT-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export function createDefaultViralProfile(): ViralProfile {
  return {
    role: "reader",
    referralCode: generateReferralCode(),
    referralCount: 0,
    questionIds: [],
    votesCast: {},
    businessCheckIns: [],
    mysteryCluesUnlocked: [],
    informedReceipts: [],
    zonesJoined: [],
  };
}

export function normalizeViralProfile(raw: Record<string, unknown> | undefined): ViralProfile {
  const base = createDefaultViralProfile();
  if (!raw) return base;
  return {
    zipCode: typeof raw.zipCode === "string" ? raw.zipCode : undefined,
    role: (typeof raw.role === "string" ? raw.role : base.role) as UserRole,
    referralCode: typeof raw.referralCode === "string" ? raw.referralCode : base.referralCode,
    referralCount: typeof raw.referralCount === "number" ? raw.referralCount : 0,
    referredBy: typeof raw.referredBy === "string" ? raw.referredBy : undefined,
    questionIds: Array.isArray(raw.questionIds) ? (raw.questionIds as string[]) : [],
    votesCast: typeof raw.votesCast === "object" && raw.votesCast ? (raw.votesCast as Record<string, string>) : {},
    businessCheckIns: Array.isArray(raw.businessCheckIns) ? (raw.businessCheckIns as string[]) : [],
    alumniYear: typeof raw.alumniYear === "string" ? raw.alumniYear : undefined,
    mysteryCluesUnlocked: Array.isArray(raw.mysteryCluesUnlocked) ? (raw.mysteryCluesUnlocked as number[]) : [],
    informedReceipts: Array.isArray(raw.informedReceipts) ? (raw.informedReceipts as string[]) : [],
    zonesJoined: Array.isArray(raw.zonesJoined) ? (raw.zonesJoined as string[]) : [],
  };
}

export function loadCommunity(): CommunityState {
  if (typeof window === "undefined") return DEFAULT_COMMUNITY;
  try {
    const stored = localStorage.getItem(COMMUNITY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<CommunityState>;
      return {
        ...DEFAULT_COMMUNITY,
        ...parsed,
        referralCounts: parsed.referralCounts ?? {},
      };
    }
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_COMMUNITY };
}

export function saveCommunity(state: CommunityState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMMUNITY_KEY, JSON.stringify(state));
}

export function mergeProfileWithViral(profile: UserProfile): UserProfile & { viral: ViralProfile } {
  const viral = normalizeViralProfile((profile as UserProfile & { viral?: ViralProfile }).viral as Record<string, unknown> | undefined);
  return { ...profile, viral };
}

export function saveViralProfile(profile: UserProfile, viral: ViralProfile): UserProfile {
  const merged = { ...profile, viral };
  if (typeof window !== "undefined") {
    localStorage.setItem("mitchel-turner-user", JSON.stringify(merged));
  }
  return merged;
}

function computeRole(viral: ViralProfile, profile: UserProfile): UserRole {
  const verified = profile.followedFacebook && Boolean(profile.facebookUserId);
  if (verified && viral.referralCount >= 3) return "insider";
  if (viral.referralCount >= 3) return "advocate";
  if (viral.businessCheckIns.length >= 1) return "witness";
  if (viral.questionIds.length >= 1) return "scout";
  if (verified) return "reader";
  return "reader";
}

export function onVerifiedFollow(
  profile: UserProfile,
  viral: ViralProfile,
  referrerCode?: string
): { profile: UserProfile; viral: ViralProfile; community: CommunityState } {
  const community = loadCommunity();
  community.globalVerifiedFollows += 1;
  community.scarcityClaimed = Math.min(SCARCITY_DROP.totalSpots, community.scarcityClaimed + 1);

  if (referrerCode && referrerCode !== viral.referralCode) {
    community.referralCounts[referrerCode] = (community.referralCounts[referrerCode] ?? 0) + 1;
  }
  viral.referralCount = community.referralCounts[viral.referralCode] ?? viral.referralCount;

  if (viral.zipCode) {
    const zone = getZoneByZip(viral.zipCode);
    if (zone && !viral.zonesJoined.includes(zone.id)) {
      community.zoneFollowers[zone.id] = (community.zoneFollowers[zone.id] ?? 0) + 1;
      viral.zonesJoined = [...viral.zonesJoined, zone.id];
    }
  }

  if (viral.alumniYear) {
    community.alumniCounts[viral.alumniYear] = (community.alumniCounts[viral.alumniYear] ?? 0) + 1;
  }

  unlockMysteryClues(viral, profile);
  viral.role = computeRole(viral, profile);
  saveCommunity(community);
  const updated = saveViralProfile(profile, viral);
  return { profile: updated, viral, community };
}

export function processReferral(profile: UserProfile, viral: ViralProfile, refCode: string): { profile: UserProfile; viral: ViralProfile } {
  if (!refCode || refCode === viral.referralCode) return { profile, viral };
  const claimed = localStorage.getItem(`ref-claimed-${refCode}-${profile.id}`);
  if (claimed) return { profile, viral };

  localStorage.setItem(`ref-claimed-${refCode}-${profile.id}`, "1");
  viral.referredBy = refCode;

  const community = loadCommunity();
  const credit = community.storyCredits.find((c) => c.userId === refCode || community.storyCredits.find((s) => s.name.includes(refCode)));
  const referrerIdx = community.storyCredits.findIndex((c) => c.userId === refCode);
  if (referrerIdx >= 0) {
    community.storyCredits[referrerIdx].readersReached += 1;
  } else {
    community.storyCredits.push({ userId: refCode, name: "Community Member", storyId: "3", readersReached: 1 });
  }
  saveCommunity(community);

  return { profile, viral };
}

export function creditReferrerOnVerify(referrerCode: string, newUserName: string): void {
  const community = loadCommunity();
  const idx = community.storyCredits.findIndex((c) => c.userId === referrerCode);
  if (idx >= 0) {
    community.storyCredits[idx].readersReached += 1;
  } else {
    community.storyCredits.push({
      userId: referrerCode,
      name: newUserName,
      storyId: "3",
      readersReached: 1,
    });
  }
  saveCommunity(community);
}

export function setZipCode(profile: UserProfile, viral: ViralProfile, zip: string): UserProfile {
  viral.zipCode = zip;
  return saveViralProfile(profile, viral);
}

export function setAlumniYear(profile: UserProfile, viral: ViralProfile, year: string): UserProfile {
  viral.alumniYear = year;
  return saveViralProfile(profile, viral);
}

export function submitQuestion(
  profile: UserProfile,
  viral: ViralProfile,
  storyId: string,
  text: string
): { profile: UserProfile; community: CommunityState } {
  const community = loadCommunity();
  const q = {
    id: `q_${Date.now()}`,
    storyId,
    text,
    userId: profile.id,
    userName: profile.name,
    zipCode: viral.zipCode,
    createdAt: new Date().toISOString(),
  };
  community.questions.push(q);
  viral.questionIds.push(q.id);
  viral.role = computeRole(viral, profile);
  saveCommunity(community);
  const updated = saveViralProfile(profile, viral);
  return { profile: updated, community };
}

export function castVote(profile: UserProfile, viral: ViralProfile, pollId: string, optionId: string): UserProfile {
  if (viral.votesCast[pollId]) return profile;
  const community = loadCommunity();
  if (!community.pollVotes[pollId]) community.pollVotes[pollId] = {};
  community.pollVotes[pollId][optionId] = (community.pollVotes[pollId][optionId] ?? 0) + 1;
  viral.votesCast[pollId] = optionId;
  saveCommunity(community);
  return saveViralProfile(profile, viral);
}

export function businessCheckIn(profile: UserProfile, viral: ViralProfile, partnerId: string): UserProfile {
  if (!viral.businessCheckIns.includes(partnerId)) {
    viral.businessCheckIns.push(partnerId);
    viral.role = computeRole(viral, profile);
  }
  return saveViralProfile(profile, viral);
}

export function generateInformedReceipt(profile: UserProfile, viral: ViralProfile, storyId: string, storyTitle: string): UserProfile {
  if (!viral.informedReceipts.includes(storyId)) {
    viral.informedReceipts.push(storyId);
  }
  return saveViralProfile(profile, viral);
}

function unlockMysteryClues(viral: ViralProfile, profile: UserProfile): void {
  if (!profile.followedAt) return;
  const followed = new Date(profile.followedAt);
  const now = new Date();
  const daysSince = Math.floor((now.getTime() - followed.getTime()) / 86400000);
  for (let d = 1; d <= Math.min(daysSince + 1, 7); d++) {
    if (!viral.mysteryCluesUnlocked.includes(d)) viral.mysteryCluesUnlocked.push(d);
  }
  if (viral.referralCount >= 1 && !viral.mysteryCluesUnlocked.includes(0)) {
    viral.mysteryCluesUnlocked.push(0);
  }
}

export function incrementReferralCount(profile: UserProfile, viral: ViralProfile): UserProfile {
  viral.referralCount += 1;
  unlockMysteryClues(viral, profile);
  viral.role = computeRole(viral, profile);
  return saveViralProfile(profile, viral);
}

export function isZoneUnlocked(zoneId: string, community: CommunityState): boolean {
  const zone = NEIGHBORHOOD_ZONES.find((z) => z.id === zoneId);
  if (!zone) return false;
  return (community.zoneFollowers[zoneId] ?? 0) >= zone.threshold;
}

export function isRecruitmentUnlocked(community: CommunityState): boolean {
  return community.globalVerifiedFollows >= RECRUITMENT_CAMPAIGN.targetFollows;
}

export function isQuestionGateOpen(community: CommunityState): boolean {
  return community.questions.length >= QUESTION_UNLOCK_THRESHOLD;
}

export function isScarcityAvailable(community: CommunityState): boolean {
  return community.scarcityClaimed < SCARCITY_DROP.totalSpots;
}

export function getAvailableMysteryClues(viral: ViralProfile, profile: UserProfile): typeof MYSTERY_SERIAL.clues {
  if (!profile.followedFacebook) return [];
  unlockMysteryClues(viral, profile);
  return MYSTERY_SERIAL.clues.filter((c) => viral.mysteryCluesUnlocked.includes(c.day));
}

export function getStoryCredits(storyId: string): import("./types").StoryCredit[] {
  return loadCommunity().storyCredits.filter((c) => c.storyId === storyId);
}

export function getRoleInfo(role: UserRole) {
  return ROLE_DEFINITIONS.find((r) => r.id === role) ?? ROLE_DEFINITIONS[0];
}

export function getReferralUrl(referralCode: string): string {
  if (typeof window === "undefined") return `?ref=${referralCode}`;
  return `${window.location.origin}?ref=${referralCode}`;
}

export function hasFullAccess(profile: UserProfile, viral: ViralProfile, community: CommunityState): boolean {
  return Boolean(profile.followedFacebook && profile.facebookUserId);
}

export function getUnlockPaths(profile: UserProfile, viral: ViralProfile, community: CommunityState, storyId: string): string[] {
  const paths: string[] = [];
  if (profile.followedFacebook && profile.facebookUserId) paths.push("Verified Facebook follow");
  if (isRecruitmentUnlocked(community)) paths.push("Community recruitment goal reached");
  if (isQuestionGateOpen(community) && storyId === "3") paths.push("Community questions submitted");
  if (viral.businessCheckIns.length > 0 && storyId === "6") paths.push("Partner business check-in");
  NEIGHBORHOOD_ZONES.filter((z) => z.storyId === storyId).forEach((z) => {
    if (isZoneUnlocked(z.id, community)) paths.push(`${z.name} zone unlocked`);
  });
  return paths;
}

export {
  NEIGHBORHOOD_ZONES,
  RECRUITMENT_CAMPAIGN,
  SCARCITY_DROP,
  MYSTERY_SERIAL,
  ROLE_DEFINITIONS,
  AUDIO_DROPS,
  BUSINESS_PARTNERS,
  ALUMNI_CLASSES,
  LIVE_POLLS,
} from "./data";
