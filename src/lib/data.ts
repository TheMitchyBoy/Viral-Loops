import { NewsItem, BonusContent, RewardTier, CommunityMember } from "./types";

export { AUTHOR_NAME, SITE_NAME, CITY_NAME, SITE_TAGLINE } from "./brand";
export { FACEBOOK_PAGE_URL } from "./viral-engine";

export {
  getAllPosts,
  getNewsBySlug,
  getFeaturedNews,
  getTrendingNews,
  getNewsByCategory,
  getArticleSlugs,
  getVideoSlugs,
  getCategories,
  getLockedContentCount,
  getBonusForContent,
  getExclusivePosts,
} from "./posts";

export const MEMBER_PERKS: RewardTier[] = [
  {
    id: "reader",
    name: "Reader",
    perks: ["Access to free articles and videos", "Daily news updates"],
    badge: "📖",
    color: "gray",
  },
  {
    id: "follower",
    name: "Facebook Follower",
    perks: ["Unlock exclusive investigations", "Bonus video content", "Extended reports & interviews"],
    badge: "👍",
    color: "blue",
  },
  {
    id: "insider",
    name: "Insider",
    perks: ["Full access to all premium previews", "Early access to breaking stories", "Community updates on Facebook"],
    badge: "💎",
    color: "purple",
  },
];

export const COMMUNITY_HIGHLIGHTS: CommunityMember[] = [
  { rank: 1, name: "Maria G.", badge: "💎", label: "Early follower" },
  { rank: 2, name: "David K.", badge: "👍", label: "Community member" },
  { rank: 3, name: "Jennifer L.", badge: "👍", label: "Community member" },
  { rank: 4, name: "Robert T.", badge: "📖", label: "Active reader" },
  { rank: 5, name: "Lisa M.", badge: "📖", label: "Active reader" },
];

export function getFollowerPerk(profile: { followedFacebook: boolean; facebookUserId?: string }): RewardTier {
  if (profile.followedFacebook && profile.facebookUserId) return MEMBER_PERKS[1];
  return MEMBER_PERKS[0];
}

/** @deprecated Use getBonusForContent from posts.ts (async) */
export const BONUS_CONTENT: BonusContent[] = [];

/** @deprecated Use getAllPosts from posts.ts (async) */
export const NEWS_ITEMS: NewsItem[] = [];
