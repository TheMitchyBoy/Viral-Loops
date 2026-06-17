import { NewsItem, BonusContent, RewardTier, CommunityMember } from "./types";

export { AUTHOR_NAME, SITE_NAME, CITY_NAME, SITE_TAGLINE } from "./brand";

export { FACEBOOK_PAGE_URL } from "./viral-engine";

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

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    slug: "downtown-revitalization-plan-approved",
    type: "article",
    tier: "free",
    title: "City Council Approves $42M Downtown Revitalization Plan",
    excerpt:
      "After months of debate, Riverside's city council voted 6-1 to approve a sweeping downtown redevelopment project that includes a new transit hub, pedestrian plaza, and affordable housing units.",
    body: `After months of heated public hearings and community forums, the Riverside City Council voted 6-1 Tuesday night to approve a $42 million downtown revitalization plan that promises to transform the city's aging core.

The plan, developed over 18 months with input from over 2,000 residents, includes:

**Key Components:**
- A new multi-modal transit hub connecting bus, bike, and future light rail
- A 2-acre pedestrian plaza with year-round programming
- 180 units of affordable housing above ground-floor retail
- Complete street redesign with protected bike lanes on Main and Oak
- Historic facade restoration grants for 40 buildings

"This is the most significant investment in our downtown in a generation," said Mayor Elena Vasquez, who has championed the project since her election. "We're not just building infrastructure — we're building community."

**Community Response**
The vote followed passionate testimony from both supporters and skeptics. Small business owners along Main Street expressed cautious optimism, while some longtime residents worried about displacement.

Council member James Okonkwo cast the lone dissenting vote, citing concerns about the project's timeline and funding gaps. "I support downtown investment, but I need more assurance that existing residents won't be priced out," he said.

**What's Next**
Construction is slated to begin in fall 2026, with the transit hub opening by 2028. The city has secured $28 million in state and federal grants, with the remainder coming from a voter-approved bond measure.

Community input sessions on design details will continue through the summer. Residents can sign up for updates at riverside.gov/downtown.`,
    category: "Politics",
    author: "Mitchel Turner",
    publishedAt: "2026-06-15T08:00:00Z",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop",
    tags: ["downtown", "development", "city council"],
    followerCount: 342,
    viewCount: 4821,
  },
  {
    id: "3",
    slug: "hidden-contamination-river-investigation",
    type: "article",
    tier: "follow-unlock",
    title: "EXCLUSIVE: Documents Reveal Hidden Contamination Near Riverside Creek",
    excerpt:
      "Our investigative team uncovered internal memos suggesting industrial runoff levels near Riverside Creek may exceed safe limits — and residents weren't told.",
    body: `Preliminary findings from a six-month investigation by Mitchel Turner suggest that contamination levels in sediment samples taken from Riverside Creek near the old Meridian Industrial Park may exceed EPA safety thresholds for heavy metals.

Internal documents obtained through public records requests show that county environmental officials were aware of elevated readings as early as March 2024, but no public advisory was issued.

Our full report includes:
- Lab results from 12 sampling sites
- Timeline of agency communications
- Interviews with 8 affected families
- Map of contamination spread

**Agency Response**
County environmental director Thomas Reeves declined multiple interview requests. In a written statement, the department said it is "reviewing historical data and will issue a public update if warranted."

**Community Impact**
Residents along Creek View Lane report they've noticed unusual odors and discoloration in the water for years. "We assumed someone was looking out for us," said Maria Martinez, who has lived on the street for 22 years. "Turns out nobody told us anything."

The full investigation, including lab results and contamination maps, is available below for Facebook followers.`,
    category: "Investigation",
    author: "Mitchel Turner",
    publishedAt: "2026-06-15T06:00:00Z",
    readTime: 8,
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=675&fit=crop",
    tags: ["environment", "investigation", "health"],
    followerCount: 156,
    viewCount: 2100,
  },
  {
    id: "4",
    slug: "farmers-market-expansion-summer",
    type: "article",
    tier: "free",
    title: "Riverside Farmers Market Doubles in Size for Summer Season",
    excerpt:
      "Starting this Saturday, the beloved Saturday market expands to 80 vendors with live music, cooking demos, and a new kids' activity zone.",
    body: `Riverside's Saturday Farmers Market is about to get a whole lot bigger.

Organizers announced Wednesday that the market, which has operated in Central Park for 15 years, will expand from 40 to 80 vendors beginning this Saturday. The expansion includes a dedicated live music stage, weekly cooking demonstrations from local chefs, and a new "Sprouts Zone" with free activities for children.

"We've had a waitlist of vendors for three years," said market director Amy Rodriguez. "This summer felt like the right time to grow."

New vendors include a Vietnamese banh mi cart, a heritage grain bakery, and Riverside's first kombucha on tap. The market runs 8 a.m. to 1 p.m. every Saturday through October.`,
    category: "Community",
    author: "Mitchel Turner",
    publishedAt: "2026-06-14T14:00:00Z",
    readTime: 3,
    imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=675&fit=crop",
    tags: ["food", "community", "events"],
    followerCount: 523,
    viewCount: 8900,
  },
  {
    id: "5",
    slug: "mayor-town-hall-recording",
    type: "video",
    tier: "follow-unlock",
    title: "WATCH: Mayor's Town Hall — Full Recording + Unreleased Q&A",
    excerpt:
      "Miss the town hall? Watch the full 90-minute session plus 20 minutes of audience Q&A that wasn't broadcast live.",
    category: "Politics",
    author: "Mitchel Turner",
    publishedAt: "2026-06-13T20:00:00Z",
    duration: 110,
    imageUrl: "https://images.unsplash.com/photo-1475721027880-dc378b9a3148?w=1200&h=675&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["politics", "town hall", "mayor"],
    followerCount: 234,
    viewCount: 5600,
  },
  {
    id: "6",
    slug: "new-restaurant-row-preview",
    type: "article",
    tier: "follow-unlock",
    title: "INSIDER: First Look at Restaurant Row Opening Next Month",
    excerpt:
      "We got exclusive access to the four restaurants opening on the new Restaurant Row — menus, prices, and opening dates inside.",
    body: `Four restaurants are set to open within two weeks of each other on the newly renovated Restaurant Row block between 4th and 5th on Maple Street:

1. **Ember & Oak** — Wood-fired Italian, $$$, opens July 1
2. **Kim's Table** — Korean fusion small plates, $$, opens July 8
3. **The Daily Grind 2.0** — Third-wave coffee + bakery, $, opens July 3
4. **Riverside Raw** — Plant-based fine dining, $$$$, opens July 15

We spent a week with each chef team for exclusive previews. Full menus, chef interviews, and reservation links are included below for Facebook followers.`,
    category: "Food",
    author: "Mitchel Turner",
    publishedAt: "2026-06-15T10:00:00Z",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=675&fit=crop",
    tags: ["food", "restaurants", "exclusive"],
    followerCount: 89,
    viewCount: 1200,
  },
  {
    id: "7",
    slug: "school-board-budget-crisis",
    type: "article",
    tier: "free",
    title: "School Board Faces $3.2M Budget Gap Ahead of Fall Vote",
    excerpt:
      "Riverside Unified's superintendent outlined painful cuts that could affect arts programs, bus routes, and class sizes if a parcel tax fails in November.",
    body: `Riverside Unified School District Superintendent Dr. Patricia Nguyen presented a stark budget picture to the school board Monday night: a $3.2 million shortfall that could force significant cuts if voters reject a proposed parcel tax in November.

"We've cut administration to the bone," Dr. Nguyen said. "What remains are programs that directly touch students."

Potential cuts include:
- Elimination of elementary art and music (saving $800K)
- Reduction of bus routes in outlying areas ($450K)
- Increased class sizes by 3-4 students ($1.1M)
- Deferred technology refresh ($400K)

The parcel tax would add $98 per year to property tax bills and generate an estimated $4.1 million annually. A similar measure failed by 312 votes in 2024.

Parents and teachers packed the board room, with many urging the board to prioritize student-facing programs. A community forum is scheduled for June 28.`,
    category: "Education",
    author: "Mitchel Turner",
    publishedAt: "2026-06-14T16:00:00Z",
    readTime: 4,
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aedcedb25?w=1200&h=675&fit=crop",
    tags: ["education", "budget", "schools"],
    followerCount: 445,
    viewCount: 6700,
  },
  {
    id: "8",
    slug: "weekend-events-guide",
    type: "video",
    tier: "free",
    title: "Your Riverside Weekend: 12 Events You Can't Miss",
    excerpt:
      "From the expanded farmers market to a free concert at Riverfront Park — your complete guide to the best of Riverside this weekend.",
    category: "Events",
    author: "Mitchel Turner",
    publishedAt: "2026-06-15T07:00:00Z",
    duration: 6,
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=675&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["events", "weekend", "guide"],
    followerCount: 678,
    viewCount: 9200,
  },
];

export const BONUS_CONTENT: BonusContent[] = [
  {
    id: "b1",
    parentId: "3",
    title: "Full Lab Results & Contamination Map",
    description: "Complete EPA lab reports from all 12 sampling sites with interactive contamination map",
    type: "extended-article",
    content: "Detailed lab results show lead levels at Site 7 (near Oak Street bridge) at 340 ppm — nearly 3x the EPA residential limit of 120 ppm. Arsenic readings at Sites 3 and 9 also exceeded thresholds...",
  },
  {
    id: "b2",
    parentId: "3",
    title: "Resident Interview: 'We Weren't Told'",
    description: "8-minute video interview with families living near the creek",
    type: "bonus-video",
    content: "Extended interview footage with the Martinez family, who've lived on Creek View Lane for 22 years...",
  },
  {
    id: "b4",
    parentId: "5",
    title: "Unreleased Q&A: Audience Questions",
    description: "20 minutes of audience questions that weren't in the live broadcast",
    type: "bonus-video",
    content: "Questions about housing policy, police budget, and the downtown plan that didn't make the live stream...",
  },
];

export const COMMUNITY_HIGHLIGHTS: CommunityMember[] = [
  { rank: 1, name: "Maria G.", badge: "💎", label: "Early follower" },
  { rank: 2, name: "David K.", badge: "👍", label: "Community member" },
  { rank: 3, name: "Jennifer L.", badge: "👍", label: "Community member" },
  { rank: 4, name: "Robert T.", badge: "📖", label: "Active reader" },
  { rank: 5, name: "Lisa M.", badge: "📖", label: "Active reader" },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS_ITEMS.find((item) => item.slug === slug);
}

export function getBonusForContent(contentId: string): BonusContent[] {
  return BONUS_CONTENT.filter((b) => b.parentId === contentId);
}

export function getFeaturedNews(): NewsItem[] {
  return NEWS_ITEMS.slice(0, 3);
}

export function getTrendingNews(): NewsItem[] {
  return [...NEWS_ITEMS].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
}

export function getNewsByCategory(category: string): NewsItem[] {
  return NEWS_ITEMS.filter((item) => item.category === category);
}

export function getFollowerPerk(profile: { followedFacebook: boolean; facebookUserId?: string }): RewardTier {
  if (profile.followedFacebook && profile.facebookUserId) return MEMBER_PERKS[1];
  return MEMBER_PERKS[0];
}

export function getLockedContentCount(): number {
  return NEWS_ITEMS.filter((item) => item.tier !== "free").length;
}
