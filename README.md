# Riverside Daily — Local News with Facebook Access

A local news website that uses a verified Facebook follow loop to give readers access to exclusive content.

## Features

### Local News Platform
- Articles and video content covering politics, sports, community, education, and investigations
- Category browsing, trending sidebar, and featured stories
- Responsive, modern news-site design

### Verified Facebook Follow Loop
- **Follow-to-Unlock**: Follow Riverside Daily on Facebook to access exclusive content
- **Verified via Facebook Login**: Users log in with Facebook; the server checks they like/follow the page via Graph API
- **One Follow, Full Access**: A verified follow unlocks all gated content and bonus material
- **Bonus Content**: Extended articles, bonus videos, and interviews for verified followers

## Getting Started

```bash
npm install
cp .env.example .env.local
# Add your Facebook App ID, App Secret, and Page ID
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Facebook Setup (Required)

1. Create a [Meta for Developers](https://developers.facebook.com/) app
2. Add **Facebook Login** product
3. Set **Valid OAuth Redirect URIs** to your site URL (e.g. `http://localhost:3000`)
4. Copy your **App ID** and **App Secret**
5. Find your **Page ID** (Facebook Page → About → Page transparency, or Graph API Explorer)
6. Add to `.env.local`:

```env
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
NEXT_PUBLIC_FACEBOOK_PAGE_ID=your_numeric_page_id
NEXT_PUBLIC_FACEBOOK_PAGE_URL=https://www.facebook.com/yourpage
```

### Permissions

Verification uses the `user_likes` permission to confirm the user likes/follows your page. In **Development** mode, only app admins, developers, and test users can grant this. Submit for **App Review** before going to production.

## How Verification Works

1. User opens locked content
2. User follows/likes the Facebook page
3. User clicks **Verify with Facebook** → Facebook Login popup
4. Client sends access token to `/api/facebook/verify-follow`
5. Server validates token and checks Graph API `me/likes` for your Page ID
6. If verified, exclusive content unlocks

## Tech Stack

- **Next.js 15** (App Router)
- **Facebook JavaScript SDK** + **Graph API**
- **TypeScript** + **Tailwind CSS 4**
- Local storage for verified follow status

## Project Structure

```
src/
├── app/api/facebook/verify-follow/   # Server-side follow verification
├── components/FollowModal.tsx        # Follow + verify UI
├── lib/facebook-config.ts            # Env configuration
├── lib/facebook-verify.ts            # Graph API verification logic
└── lib/viral-engine.ts               # Profile & unlock state
```
