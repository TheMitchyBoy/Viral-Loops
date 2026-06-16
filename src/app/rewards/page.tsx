"use client";

import { useUser } from "@/context/UserContext";
import { MEMBER_PERKS, NEWS_ITEMS, getFollowerPerk, getLockedContentCount, FACEBOOK_PAGE_URL } from "@/lib/data";
import { getAllBadges, openFacebookPage } from "@/lib/viral-engine";
import { Facebook, Check, Lock, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function RewardsPage() {
  const { profile, setFollowTarget, setShowFollowModal } = useUser();
  const verified = profile.followedFacebook && Boolean(profile.facebookUserId);
  const currentPerk = getFollowerPerk(profile);
  const allBadges = getAllBadges();
  const lockedCount = getLockedContentCount();
  const exclusiveItems = NEWS_ITEMS.filter((n) => n.tier !== "free");

  const openFollowModal = () => {
    setFollowTarget({ id: "follow", slug: "", title: "Riverside Daily Exclusive Content" });
    setShowFollowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Exclusive Access</h1>
      <p className="text-stone-500 mb-8">
        Follow Riverside Daily on Facebook and verify with Facebook login to unlock exclusive content.
      </p>

      <section className="bg-white rounded-xl border border-stone-200 p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{currentPerk.badge}</span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              {verified ? "Verified Facebook Follower" : "Reader"}
            </h2>
            <p className="text-sm text-stone-500">{currentPerk.perks.join(" · ")}</p>
            {verified && profile.facebookName && (
              <p className="text-xs text-stone-400 mt-1">Verified as {profile.facebookName}</p>
            )}
          </div>
        </div>

        {verified ? (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 rounded-lg p-4 text-sm">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>
              Your Facebook follow is verified. All {lockedCount} exclusive stories are unlocked.
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-stone-600">
              Follow us on Facebook, then verify with Facebook login to unlock {lockedCount} exclusive stories, videos, and bonus content.
            </p>
            <button
              onClick={openFollowModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1877F2] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#166FE5] transition-colors"
            >
              <Facebook className="w-5 h-5" />
              Verify Facebook Follow
            </button>
          </div>
        )}
      </section>

      <section id="perks" className="mb-8">
        <h2 className="text-xl font-bold text-stone-900 mb-4">What You Unlock</h2>
        <div className="grid gap-3">
          {MEMBER_PERKS.map((perk) => {
            const isActive =
              perk.id === "reader" ||
              (perk.id === "follower" && verified) ||
              (perk.id === "insider" && verified);
            return (
              <div
                key={perk.id}
                className={`rounded-xl border p-4 flex items-center gap-4 transition-colors ${
                  isActive ? "border-blue-200 bg-blue-50" : "border-stone-200 bg-white opacity-60"
                }`}
              >
                <span className="text-2xl">{perk.badge}</span>
                <div className="flex-1">
                  <div className="font-semibold text-stone-900">{perk.name}</div>
                  <div className="text-sm text-stone-600 mt-0.5">{perk.perks.join(" · ")}</div>
                </div>
                {isActive && <Check className="w-5 h-5 text-emerald-600" />}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Exclusive Content</h2>
        <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
          {exclusiveItems.map((item) => {
            const href = item.type === "video" ? `/video/${item.slug}` : `/article/${item.slug}`;
            return (
              <Link
                key={item.id}
                href={href}
                className="flex items-center gap-3 p-4 hover:bg-stone-50 transition-colors"
              >
                {verified ? (
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-stone-400 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-stone-900 truncate">{item.title}</div>
                  <div className="text-xs text-stone-500">{item.category} · {item.type}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#1877F2] to-blue-700 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Facebook className="w-5 h-5" />
          <h2 className="text-xl font-bold">Verify on Facebook</h2>
        </div>
        <p className="text-blue-100 text-sm mb-4">
          We use Facebook Login to confirm you follow our page before unlocking exclusive content. No manual confirmation — verification is automatic.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => openFacebookPage()}
            className="flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open Facebook Page
          </button>
          {!verified && (
            <button
              onClick={openFollowModal}
              className="flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Verify Follow & Unlock
            </button>
          )}
        </div>
        <p className="text-xs text-blue-200 mt-3">{FACEBOOK_PAGE_URL.replace("https://www.", "")}</p>
      </section>

      <section id="badges" className="mb-8">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {allBadges.map((badge) => {
            const earned = profile.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-xl border p-4 text-center transition-colors ${
                  earned ? "border-amber-200 bg-amber-50" : "border-stone-200 bg-stone-50 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-sm font-semibold text-stone-900">{badge.name}</div>
                <div className="text-xs text-stone-500 mt-0.5">{badge.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="text-center bg-stone-100 rounded-xl p-8">
        <h3 className="text-lg font-bold text-stone-900 mb-2">Ready to read more?</h3>
        <p className="text-stone-500 text-sm mb-4">
          Browse the latest Riverside stories — free articles are always open, exclusives require a verified Facebook follow.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors"
        >
          Browse Latest News
        </Link>
      </div>
    </div>
  );
}
