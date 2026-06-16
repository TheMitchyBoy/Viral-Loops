# Riverside Daily — Local News with Viral Loops

A local news website that uses viral loop mechanics to encourage readers and video viewers to share content online in exchange for rewards and exclusive content.

## Features

### Local News Platform
- Articles and video content covering politics, sports, community, education, and investigations
- Category browsing, trending sidebar, and featured stories
- Responsive, modern news-site design

### Viral Loop Engine
- **Share-to-Earn**: Share any story on Twitter/X, Facebook, WhatsApp, or email to earn reward points
- **Share-to-Unlock**: Exclusive investigations and extended videos require sharing to access
- **Referral System**: Unique referral codes — earn 50 points when friends join via your link
- **Reward Tiers**: Reader → Contributor → Ambassador → Insider with escalating perks
- **Badges & Streaks**: Gamified badges for sharing milestones and daily streaks
- **Bonus Content**: Extended articles, bonus videos, and interviews unlocked through sharing
- **Leaderboard**: Community ranking of top sharers

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide React** icons
- Local storage for user profile, points, and share tracking (demo mode)

## How the Viral Loop Works

1. **Read/Watch** — User consumes free local news content
2. **Share Prompt** — After reading, user is prompted to share for +15–50 points
3. **Social Share** — One-click sharing to major platforms with tracked referral URL
4. **Unlock Content** — Sharing unlocks gated investigations, bonus videos, and premium reports
5. **Refer Friends** — Referral links bring new readers; referrer earns bonus points
6. **Climb Tiers** — Accumulated points unlock Insider-tier exclusive content
7. **Repeat** — Leaderboard, badges, and streaks drive continued engagement

## Project Structure

```
src/
├── app/                  # Next.js pages (home, article, video, rewards, category)
├── components/           # UI components (Header, NewsCard, ShareModal, etc.)
├── context/              # User profile & rewards state
└── lib/
    ├── data.ts           # Mock news content & reward tiers
    ├── types.ts          # TypeScript interfaces
    ├── viral-engine.ts   # Share tracking, points, badges, unlocks
    └── utils.ts          # Formatting helpers
```
