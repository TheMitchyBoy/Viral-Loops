# Mitchel Turner — Local News with 12 Viral Loops

Independent local news from **Mitchel Turner** covering politics, investigations, community, education, food, and events in Riverside — with **12 viral loop mechanics** and verified Facebook follow gates to grow readership and unlock exclusive content.

## Viral Loops

| # | Loop | Description |
|---|------|-------------|
| 1 | **Neighborhood Unlock Map** | Zip codes compete to hit follower thresholds and unlock zone stories |
| 2 | **Story Credits** | Referrers get public byline credit for readers reached |
| 3 | **Question-Driven Unlocks** | Community questions unlock full investigations |
| 4 | **Live Vote Gates** | Verified followers vote on what gets published next |
| 5 | **Voicemail Drops** | Exclusive reporter audio forwarded to neighbors |
| 6 | **Flash Scarcity Drops** | Limited spots for exclusive PDFs/assets |
| 7 | **Community-Powered Release** | 500 verified followers releases the full report |
| 8 | **Local Business Loop** | Check in at partners (codes: `KIM2026`, `EMBER26`) for perks |
| 9 | **Alumni Pride** | Riverside High alumni cohorts unlock school budget coverage |
| 10 | **Community Roles** | Scout → Witness → Advocate → Insider progression |
| 11 | **Mystery Serial** | Daily clues + bonus intel for referrers |
| 12 | **Accountability Receipts** | Shareable proof you read the full story |

## Database (Posts)

Articles and videos are stored in SQLite via Prisma. On first setup:

```bash
cp .env.example .env
npm run db:setup
```

- **`npm run db:setup`** — create/sync schema and seed posts from Mitchel Turner stories
- **`npm run db:seed`** — re-run seed (upserts posts; safe to repeat)
- Posts without `imageUrl` in the database use category-based Unsplash placeholders until you upload photos

To add or edit posts, update `prisma/seed.ts` or insert rows directly into the `Post` table, then run `npm run db:seed`.

For production, point `DATABASE_URL` at PostgreSQL and run `prisma db push` + seed before build.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

- **Home:** http://localhost:3000
- **Viral Loops Hub:** http://localhost:3000/loops
- **Access & Badges:** http://localhost:3000/rewards

## Facebook Verification

Exclusive content requires a **verified Facebook follow** via Login + Graph API. See `.env.example` for required Meta app credentials.

## Key Routes

- `/loops` — All 12 viral loop UIs in one hub
- `/article/peacehealth-ketchikan-dossier` — Question unlock, live vote, story credits, receipts
- `?ref=MT-XXXXXX` — Referral links for story credit chain

## Tech Stack

Next.js 15 · TypeScript · Tailwind CSS 4 · Facebook Graph API · localStorage (demo persistence)
