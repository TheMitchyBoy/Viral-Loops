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

- **`npm run db:setup`** — create/sync schema, seed Mitchel Turner stories, and sync Assembly-Scrape posts when configured
- **`npm run db:seed`** — re-run seed (upserts posts; safe to repeat)
- **`npm run db:sync-assembly`** — pull published `blog_posts` from [Assembly-Scrape](https://github.com/TheMitchyBoy/Assembly-Scrape) into the site database
- Posts without `imageUrl` in the database use category-based Unsplash placeholders until you upload photos

### Assembly-Scrape integration

Set `ASSEMBLY_DATABASE_URL` in `.env` to the Assembly-Scrape database (PostgreSQL on Railway or local SQLite). The site **reads assembly articles at runtime** (refreshed every 60 seconds) and also syncs them into the local database during build/dev startup.

Example titles include borough assembly coverage such as *Ketchikan Gateway Borough Assembly Approves Key Amendments and Funding in Special Meeting*. Without `ASSEMBLY_DATABASE_URL`, a sample assembly article is included in the seed for local development.

To add or edit curated posts (investigations, videos, viral loops), update `prisma/seed.ts` or insert rows directly into the `Post` table, then run `npm run db:seed`.

For production, point `DATABASE_URL` at your site database and set `ASSEMBLY_DATABASE_URL` on the **Viral-Loops** Railway service.

#### Railway setup (important)

1. Open your **Assembly-Scrape** project in Railway.
2. Click the **Postgres** service → **Variables** (or Connect).
3. Copy the full **`DATABASE_URL`** value — it looks like:
   `postgresql://postgres:abc123xyz@some-name.railway.internal:5432/railway`
   or `postgresql://postgres:abc123xyz@monorail.proxy.rlwy.net:12345/railway`
4. In your **Viral-Loops** project → **Variables**, set:
   ```
   ASSEMBLY_DATABASE_URL=<paste the entire DATABASE_URL here>
   ```
5. Redeploy Viral-Loops, then run `npm run assembly:status`.

Do **not** type `HOST.railway.internal` or `USER:PASSWORD` — paste the real URL from Railway.

**Same Railway project:** internal URL (`*.railway.internal`) works.

**Different Railway projects:** use the **public** Postgres URL (`*.proxy.rlwy.net`), not `.railway.internal`.

### Checking assembly posts (no Python needed)

**Viral-Loops runs Node.js** — the Assembly-Scrape Python bot runs in a **separate Railway service**. Do not run `python -m bot.main status` inside the Viral-Loops container.

From your browser or shell (while the site is running):

```bash
curl -s https://YOUR-SITE/api/assembly/status | jq
```

**Inside the Viral-Loops container** (no curl required):

```bash
npm run assembly:status
```

This checks `ASSEMBLY_DATABASE_URL` directly — the app does not need to be running.

Healthy response example:

```json
{
  "configured": true,
  "connected": true,
  "publishedCount": 3,
  "recentPosts": [{ "title": "...", "slug": "..." }]
}
```

To check Assembly-Scrape itself, open a shell on the **Assembly-Scrape** Railway service (not Viral-Loops) and run:

```bash
python -m bot.main status
```

## Admin dashboard

Edit posts, upload cover images, and override assembly articles at **`/admin`**.

```bash
# .env
ADMIN_PASSWORD=your-secure-password
```

- **`/admin/login`** — sign in with `ADMIN_PASSWORD`
- **`/admin/posts`** — list all stories (curated + assembly)
- **`/admin/posts/new`** — create a post
- **`/admin/posts/[id]/edit`** — edit title, body, slug, category, and cover image

**Images:** paste an external URL or upload JPG/PNG/WebP/GIF (max 5 MB) → saved to `/public/uploads/posts/`. Edits saved to the local database override assembly feed content for that slug.

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
