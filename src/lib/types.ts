export type ContentType = "article" | "video";

export type ContentTier = "free" | "share-unlock" | "premium";

export interface NewsItem {
  id: string;
  slug: string;
  type: ContentType;
  tier: ContentTier;
  title: string;
  excerpt: string;
  body?: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime?: number;
  duration?: number;
  imageUrl: string;
  videoUrl?: string;
  shareReward: number;
  unlockRequirement?: {
    type: "shares" | "points" | "referrals";
    count: number;
  };
  tags: string[];
  shareCount: number;
  viewCount: number;
}

export interface BonusContent {
  id: string;
  parentId: string;
  title: string;
  description: string;
  type: "extended-article" | "bonus-video" | "photo-gallery" | "interview";
  unlockShares: number;
  content: string;
}

export interface RewardTier {
  id: string;
  name: string;
  minPoints: number;
  perks: string[];
  badge: string;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  referralCode: string;
  points: number;
  totalShares: number;
  totalReferrals: number;
  unlockedContent: string[];
  earnedBadges: string[];
  shareStreak: number;
  lastShareDate?: string;
}

export interface ShareEvent {
  contentId: string;
  platform: "twitter" | "facebook" | "whatsapp" | "email" | "copy";
  timestamp: string;
  referralCode: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  shares: number;
  badge: string;
}
