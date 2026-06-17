import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    id: "peacehealth",
    slug: "peacehealth-ketchikan-dossier",
    type: "article",
    tier: "follow-unlock",
    title: "PeaceHealth in Ketchikan: A Community Dossier",
    excerpt:
      "An ongoing investigation into healthcare access, administration, and community impact on the island.",
    body: `This investigation began with a simple question from a reader: who decides what care looks like on the island, and who gets left out of the conversation?

Over months of reporting, Mitchel Turner reviewed public records, borough meeting minutes, and dozens of community interviews to build a living dossier on PeaceHealth's role in Ketchikan.

**What we found**
- Hospital board minutes show recurring staffing concerns dating back to 2023
- Borough healthcare funding decisions often arrive after budgets are already set
- Residents report long wait times for specialty referrals off-island
- FOIA responses reveal gaps between public statements and internal staffing data

**Why it matters**
Healthcare is not an abstract policy issue in Southeast Alaska. When ferry schedules slip or flights cancel, a delayed referral becomes a crisis. Families deserve a clear picture of how decisions are made.

**For verified followers**
The full dossier includes document timelines, interview excerpts, and a map of decision-makers connected to major policy votes. Follow on Facebook and verify to unlock the complete file.`,
    category: "Investigation",
    author: "Mitchel Turner",
    publishedAt: new Date("2025-03-15T08:00:00Z"),
    readTime: 15,
    imageUrl: null,
    tags: JSON.stringify(["healthcare", "investigation", "peacehealth", "ketchikan"]),
    followerCount: 156,
    viewCount: 4200,
    featured: true,
  },
  {
    id: "borough-budget",
    slug: "borough-budget-breakdown",
    type: "article",
    tier: "free",
    title: "Where the Borough Budget Actually Goes",
    excerpt:
      "Breaking down Ketchikan Gateway Borough spending — what residents see and what they don't.",
    body: `Every spring, the borough publishes a budget packet thick enough to stop a door. Most residents never get past the summary page — and that's by design.

This report walks through the major fund categories in plain language: harbor operations, school contributions, public safety, and capital projects that won't break ground for years but already carry debt.

**The headline numbers**
- General fund spending is driven by harbor and port-related revenue assumptions
- Personnel costs continue to absorb the largest share of discretionary dollars
- Capital projects often appear as line items years before public hearings begin

**What to watch next**
The assembly's next work session will revisit harbor fee schedules and how cruise revenue projections affect the rest of the budget. If you care about one public service on this island, it probably runs through this document.`,
    category: "Politics",
    author: "Mitchel Turner",
    publishedAt: new Date("2025-02-10T10:00:00Z"),
    readTime: 8,
    imageUrl: null,
    tags: JSON.stringify(["politics", "budget", "borough"]),
    followerCount: 412,
    viewCount: 8900,
    featured: true,
  },
  {
    id: "cruise-season",
    slug: "cruise-season-economics",
    type: "article",
    tier: "free",
    title: "Cruise Season Economics: Who Wins, Who Waits",
    excerpt:
      "The summer influx reshapes downtown every year. A look at the numbers behind the ships.",
    body: `When the first cruise ship of the season ties up, Ketchikan changes tempo. Shops extend hours, buses fill, and the working waterfront shifts into a different gear.

But the economic story is more uneven than the postcard view suggests.

**Winners and pressure points**
- Downtown retail and tour operators see concentrated summer revenue
- Hourly workers face seasonal hiring surges and winter layoffs
- Residents describe traffic and dock congestion that reshape daily routines
- Borough revenue projections depend heavily on passenger counts holding steady

This piece follows the money from gangway to general fund — and asks who carries the costs when the ships sail away.`,
    category: "Community",
    author: "Mitchel Turner",
    publishedAt: new Date("2024-08-20T14:00:00Z"),
    readTime: 6,
    imageUrl: null,
    tags: JSON.stringify(["community", "cruise", "economy"]),
    followerCount: 523,
    viewCount: 11200,
    featured: false,
  },
  {
    id: "harbor-expansion",
    slug: "harbor-expansion-working-waterfront",
    type: "article",
    tier: "free",
    title: "Harbor Expansion and the Working Waterfront",
    excerpt:
      "Fishermen, tour operators, and the city weigh in on the future of Ketchikan's docks.",
    body: `Harbor expansion is never just an engineering question in Ketchikan. It's a question about who gets mooring space, who pays the fees, and whose livelihood depends on the tide.

Commercial fishermen, charter operators, and marine trades workers all use the same waterfront — with different priorities and different timelines.

**Key tensions**
- Berth allocation between commercial and tourism traffic
- Maintenance backlog vs. new capital investment
- Fee increases that small operators say arrive faster than revenue growth

We spoke with dock users, harbor staff, and assembly members to map the tradeoffs in the current expansion plans.`,
    category: "Maritime",
    author: "Mitchel Turner",
    publishedAt: new Date("2024-07-05T16:00:00Z"),
    readTime: 7,
    imageUrl: null,
    tags: JSON.stringify(["maritime", "harbor", "fishing"]),
    followerCount: 289,
    viewCount: 6700,
    featured: false,
  },
  {
    id: "school-board",
    slug: "school-board-decisions",
    type: "article",
    tier: "follow-unlock",
    title: "School Board Decisions That Shape a Generation",
    excerpt:
      "From staffing to curriculum, the choices made in those Tuesday meetings echo for years.",
    body: `School board meetings rarely make the front page until something breaks: a budget shortfall, a staffing crisis, or a policy fight that spills into the community.

In Ketchikan, those Tuesday sessions set the conditions for classrooms, bus routes, and the teachers families rely on.

**Recent decisions worth watching**
- Staffing plans for the next academic year
- Facilities maintenance vs. new program spending
- Curriculum and policy updates with long implementation timelines

Verified followers get extended meeting notes, vote breakdowns, and the context behind the motions that pass unanimously on the agenda.`,
    category: "Education",
    author: "Mitchel Turner",
    publishedAt: new Date("2024-11-12T18:00:00Z"),
    readTime: 5,
    imageUrl: null,
    tags: JSON.stringify(["education", "school board", "policy"]),
    followerCount: 334,
    viewCount: 5400,
    featured: false,
  },
  {
    id: "assembly-special-meeting",
    slug: "ketchikan-gateway-borough-assembly-approves-key-amendments-and-funding-in-special-meeting",
    type: "article",
    tier: "free",
    title: "Ketchikan Gateway Borough Assembly Approves Key Amendments and Funding in Special Meeting",
    excerpt:
      "In a special session, the assembly advanced ordinance changes, approved targeted funding, and set the agenda for upcoming budget decisions.",
    body: `The Ketchikan Gateway Borough Assembly convened a special meeting this week to address several time-sensitive items that could not wait for the next regular work session.

**What passed**
- Key amendments to borough code related to harbor operations and administrative procedures
- Targeted funding allocations for capital maintenance and emergency reserves
- A revised timeline for upcoming budget hearings and public comment windows

**Why it matters**
Special sessions are often where consequential decisions move quickly — with less public runway than a standard agenda cycle. Residents who track harbor fees, capital projects, or borough staffing should review the approved amendments before the next budget cycle locks in assumptions.

**What's next**
Assembly members scheduled follow-up work sessions to reconcile funding priorities with projected cruise and property tax revenue. Public comment will reopen before final budget adoption.

*Source: Ketchikan Gateway Borough Assembly meeting minutes via Laserfiche WebLink.*`,
    category: "Politics",
    author: "Mitchel Turner",
    publishedAt: new Date("2025-06-10T18:00:00Z"),
    readTime: 4,
    imageUrl: null,
    tags: JSON.stringify(["politics", "assembly", "borough"]),
    followerCount: 89,
    viewCount: 1240,
    featured: false,
  },
  {
    id: "north-end",
    slug: "life-on-the-north-end",
    type: "article",
    tier: "free",
    title: "Life on the North End",
    excerpt:
      "Beyond downtown — the neighborhoods, the weddings, and the people who make Ketchikan home.",
    body: `Downtown gets the cruise cameras, but the North End holds a different rhythm: neighborhood gatherings, small businesses away from the waterfront, and families building lives far from the seasonal rush.

This story is a portrait of place — not a policy brief. Residents describe what changes when summer arrives and what stays constant when the rain returns.

It's the kind of community reporting that doesn't always fit a headline ticker, but explains why people stay.`,
    category: "Community",
    author: "Mitchel Turner",
    publishedAt: new Date("2024-06-01T12:00:00Z"),
    readTime: 4,
    imageUrl: null,
    tags: JSON.stringify(["community", "neighborhoods", "profile"]),
    followerCount: 198,
    viewCount: 3800,
    featured: false,
  },
  {
    id: "assembly-recording",
    slug: "borough-assembly-recording",
    type: "video",
    tier: "follow-unlock",
    title: "WATCH: Borough Assembly Work Session — Full Recording",
    excerpt:
      "Harbor fees, budget assumptions, and the public comment that didn't make the highlight reel.",
    category: "Politics",
    author: "Mitchel Turner",
    publishedAt: new Date("2025-05-20T20:00:00Z"),
    duration: 52,
    imageUrl: null,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: JSON.stringify(["politics", "assembly", "video"]),
    followerCount: 234,
    viewCount: 6100,
    featured: false,
  },
  {
    id: "weekend-briefing",
    slug: "ketchikan-weekend-briefing",
    type: "video",
    tier: "free",
    title: "Ketchikan Weekend Briefing: Meetings, Weather, and What's Open",
    excerpt:
      "Your quick guide to public meetings, ferry delays, and community events around the island.",
    category: "Events",
    author: "Mitchel Turner",
    publishedAt: new Date("2025-06-14T07:00:00Z"),
    duration: 5,
    imageUrl: null,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: JSON.stringify(["events", "weekend", "briefing"]),
    followerCount: 445,
    viewCount: 7200,
    featured: false,
  },
];

const bonusContent = [
  {
    id: "b1",
    parentId: "peacehealth",
    title: "Full Document Timeline & Source Map",
    description: "Chronological index of public records, FOIA responses, and board minutes in the PeaceHealth dossier",
    type: "extended-article",
    content:
      "The complete timeline spans March 2023 through March 2025, including four FOIA releases, twelve board meeting packets, and six community interview transcripts not included in the public summary.",
  },
  {
    id: "b2",
    parentId: "peacehealth",
    title: "Interview Excerpts: 'We Assumed Someone Was Watching'",
    description: "Extended quotes from families navigating referrals and wait times",
    type: "bonus-video",
    content:
      "Eight minutes of additional interview material from three families who asked to remain partially anonymous because of employment concerns in a small community.",
  },
  {
    id: "b3",
    parentId: "assembly-recording",
    title: "Unaired Public Comment Segment",
    description: "Additional public testimony from the harbor fee work session",
    type: "bonus-video",
    content:
      "Twenty-two minutes of public comment on harbor fee changes, including testimony from commercial operators and downtown business owners.",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
  }

  for (const bonus of bonusContent) {
    await prisma.bonusContent.upsert({
      where: { id: bonus.id },
      update: bonus,
      create: bonus,
    });
  }

  console.log(`Seeded ${posts.length} posts and ${bonusContent.length} bonus items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
