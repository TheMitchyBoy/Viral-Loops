"use client";

import { useUser } from "@/context/UserContext";
import { MEMBER_PERKS, getFollowerPerk } from "@/lib/data";
import { SITE_NAME, CITY_NAME } from "@/lib/brand";
import { FACEBOOK_PAGE_URL } from "@/lib/viral-engine";
import { getAllBadges, openFacebookPage } from "@/lib/viral-engine";
import { NewsItem } from "@/lib/types";
import { Facebook, Check, Lock, ExternalLink } from "lucide-react";
import Link from "next/link";

interface RewardsClientProps {
  exclusiveItems: NewsItem[];
  lockedCount: number;
}

export default function RewardsClient({ exclusiveItems, lockedCount }: RewardsClientProps) {
  const { profile, setFollowTarget, setShowFollowModal } = useUser();
  const verified = profile.followedFacebook && Boolean(profile.facebookUserId);
  const currentPerk = getFollowerPerk(profile);
  const allBadges = getAllBadges();

  const openFollowModal = () => {
    setFollowTarget({ id: "follow", slug: "", title: `${SITE_NAME} Exclusive Content` });
    setShowFollowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <p className="label-caps text-cyan-400/70 mb-2">Membership</p>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 tracking-tight">Exclusive Access</h1>
      <p className="text-zinc-500 mb-8">
        Follow {SITE_NAME} on Facebook and verify with Facebook login to unlock exclusive content.
      </p>

      <section className="card p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{currentPerk.badge}</span>
          <div>
            <h2 className="font-display text-xl font-bold">
              {verified ? "Verified Facebook Follower" : "Reader"}
            </h2>
            <p className="text-sm text-zinc-500">{currentPerk.perks.join(" · ")}</p>
            {verified && profile.facebookName && (
              <p className="text-xs text-zinc-600 mt-1">Verified as {profile.facebookName}</p>
            )}
          </div>
        </div>

        {verified ? (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 text-sm">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>
              Your Facebook follow is verified. All {lockedCount} exclusive stories are unlocked.
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-zinc-400">
              Follow us on Facebook, then verify with Facebook login to unlock {lockedCount} exclusive stories, videos, and bonus content.
            </p>
            <button onClick={openFollowModal} className="btn-facebook w-full sm:w-auto">
              <Facebook className="w-5 h-5" />
              Verify Facebook Follow
            </button>
          </div>
        )}
      </section>

      <section id="perks" className="mb-8">
        <h2 className="font-display text-xl font-bold mb-4">What You Unlock</h2>
        <div className="grid gap-3">
          {MEMBER_PERKS.map((perk) => {
            const isActive =
              perk.id === "reader" ||
              (perk.id === "follower" && verified) ||
              (perk.id === "insider" && verified);
            return (
              <div
                key={perk.id}
                className={`rounded-2xl border p-4 flex items-center gap-4 transition-colors ${
                  isActive ? "border-cyan-500/30 bg-cyan-500/10" : "card opacity-50"
                }`}
              >
                <span className="text-2xl">{perk.badge}</span>
                <div className="flex-1">
                  <div className="font-semibold text-zinc-200">{perk.name}</div>
                  <div className="text-sm text-zinc-500 mt-0.5">{perk.perks.join(" · ")}</div>
                </div>
                {isActive && <Check className="w-5 h-5 text-emerald-400" />}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-display text-xl font-bold mb-4">Exclusive Content</h2>
        <div className="card divide-y divide-white/[0.06] overflow-hidden">
          {exclusiveItems.map((item) => {
            const href = item.type === "video" ? `/video/${item.slug}` : `/article/${item.slug}`;
            return (
              <Link
                key={item.id}
                href={href}
                className="flex items-center gap-3 p-4 hover:bg-white/[0.03] transition-colors"
              >
                {verified ? (
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-zinc-200 truncate">{item.title}</div>
                  <div className="text-xs text-zinc-500">{item.category} · {item.type}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl p-6 mb-8 ring-1 ring-[#1877F2]/30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/30 to-blue-900/40" />
        <div className="absolute inset-0 backdrop-blur-xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Facebook className="w-5 h-5 text-white" />
            <h2 className="font-display text-xl font-bold">Verify on Facebook</h2>
          </div>
          <p className="text-blue-100/80 text-sm mb-4">
            We use Facebook Login to confirm you follow our page before unlocking exclusive content. No manual confirmation — verification is automatic.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => openFacebookPage()}
              className="flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2.5 rounded-full text-sm hover:bg-blue-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Facebook Page
            </button>
            {!verified && (
              <button
                onClick={openFollowModal}
                className="flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-4 py-2.5 rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                Verify Follow & Unlock
              </button>
            )}
          </div>
          <p className="text-xs text-blue-200/60 mt-3">{FACEBOOK_PAGE_URL.replace("https://www.", "")}</p>
        </div>
      </section>

      <section id="badges" className="mb-8">
        <h2 className="font-display text-xl font-bold mb-4">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {allBadges.map((badge) => {
            const earned = profile.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-2xl border p-4 text-center transition-colors ${
                  earned ? "border-amber-500/30 bg-amber-500/10" : "card opacity-40"
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-sm font-semibold text-zinc-200">{badge.name}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{badge.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="text-center card p-8">
        <h3 className="font-display text-lg font-bold mb-2">Ready to read more?</h3>
        <p className="text-zinc-500 text-sm mb-4">
          Browse the latest {CITY_NAME} stories — free articles are always open, exclusives require a verified Facebook follow.
        </p>
        <Link href="/" className="btn-primary">
          Browse Latest News
        </Link>
      </div>
    </div>
  );
}
