export type ContentType = "article" | "video";

export type ContentTier = "free" | "follow-unlock" | "premium";

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
  tags: string[];
  followerCount: number;
  viewCount: number;
}

export interface BonusContent {
  id: string;
  parentId: string;
  title: string;
  description: string;
  type: "extended-article" | "bonus-video" | "photo-gallery" | "interview";
  content: string;
}

export interface RewardTier {
  id: string;
  name: string;
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
  followedFacebook: boolean;
  followedAt?: string;
  facebookUserId?: string;
  facebookName?: string;
  unlockedContent: string[];
  earnedBadges: string[];
  viral?: import("./viral/types").ViralProfile;
}

export interface CommunityMember {
  rank: number;
  name: string;
  badge: string;
  label: string;
}
