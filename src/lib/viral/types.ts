export type UserRole = "reader" | "scout" | "witness" | "advocate" | "insider";

export interface NeighborhoodZone {
  id: string;
  name: string;
  zipCodes: string[];
  threshold: number;
  storyId: string;
  storyTitle: string;
  color: string;
}

export interface StoryCredit {
  userId: string;
  name: string;
  storyId: string;
  readersReached: number;
}

export interface LocalQuestion {
  id: string;
  storyId: string;
  text: string;
  userId: string;
  userName: string;
  zipCode?: string;
  createdAt: string;
}

export interface LivePoll {
  id: string;
  storyId: string;
  title: string;
  question: string;
  options: { id: string; label: string }[];
  endsAt: string;
  unlockStoryId: string;
}

export interface AudioDrop {
  id: string;
  title: string;
  description: string;
  duration: string;
  voicemailNumber: string;
  transcript: string;
}

export interface ScarcityDrop {
  id: string;
  title: string;
  description: string;
  totalSpots: number;
  assetLabel: string;
}

export interface RecruitmentCampaign {
  id: string;
  title: string;
  description: string;
  targetFollows: number;
  unlockStoryId: string;
  unlockLabel: string;
}

export interface BusinessPartner {
  id: string;
  name: string;
  checkInCode: string;
  unlockStoryId: string;
  perk: string;
  address: string;
}

export interface AlumniClass {
  year: string;
  label: string;
  storyId: string;
}

export interface RoleDefinition {
  id: UserRole;
  name: string;
  icon: string;
  description: string;
  requirement: string;
}

export interface MysteryClue {
  day: number;
  title: string;
  content: string;
  bonus?: boolean;
}

export interface MysterySerial {
  id: string;
  title: string;
  description: string;
  clues: MysteryClue[];
  finaleStoryId: string;
}

export interface CommunityState {
  zoneFollowers: Record<string, number>;
  globalVerifiedFollows: number;
  questions: LocalQuestion[];
  pollVotes: Record<string, Record<string, number>>;
  scarcityClaimed: number;
  storyCredits: StoryCredit[];
  alumniCounts: Record<string, number>;
  referralCounts: Record<string, number>;
}

export interface ViralProfile {
  zipCode?: string;
  role: UserRole;
  referralCode: string;
  referralCount: number;
  referredBy?: string;
  questionIds: string[];
  votesCast: Record<string, string>;
  businessCheckIns: string[];
  alumniYear?: string;
  mysteryCluesUnlocked: number[];
  informedReceipts: string[];
  zonesJoined: string[];
}
