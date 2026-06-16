# Riverside Daily — Local News with Facebook Access

A local news website that uses a Facebook follow loop to give readers and video viewers access to exclusive content in exchange for following the page.

## Features

### Local News Platform
- Articles and video content covering politics, sports, community, education, and investigations
- Category browsing, trending sidebar, and featured stories
- Responsive, modern news-site design

### Facebook Follow Loop
- **Follow-to-Unlock**: Follow Riverside Daily on Facebook to access exclusive investigations, extended videos, and insider previews
- **One Follow, Full Access**: A single Facebook follow unlocks all gated content and bonus material
- **Bonus Content**: Extended articles, bonus videos, and interviews for Facebook followers
- **Badges**: Earn badges when you follow and unlock exclusive content

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How the Follow Loop Works

1. **Read/Watch** — User consumes free local news content
2. **Hit Locked Content** — Exclusive investigations and videos show a follow prompt
3. **Follow on Facebook** — User follows Riverside Daily on Facebook
4. **Confirm Follow** — User confirms they've followed to unlock content
5. **Full Access** — All exclusive articles, videos, and bonus content are unlocked

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- Local storage for follow status and unlock tracking (demo mode)

## Configuration

Set the Facebook page URL in `src/lib/viral-engine.ts`:

```ts
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/riversidedaily";
```

## Project Structure

```
src/
├── app/                  # Next.js pages (home, article, video, rewards, category)
├── components/           # UI components (Header, NewsCard, FollowModal, etc.)
├── context/              # User profile & follow state
└── lib/
    ├── data.ts           # Mock news content & member perks
    ├── types.ts          # TypeScript interfaces
    ├── viral-engine.ts   # Facebook follow tracking & unlocks
    └── utils.ts          # Formatting helpers
```
