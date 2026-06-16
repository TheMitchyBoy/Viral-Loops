"use client";

import { useUser } from "@/context/UserContext";
import { REWARD_TIERS, LEADERBOARD, getRewardTier, getNextTier } from "@/lib/data";
import { getAllBadges } from "@/lib/viral-engine";
import { Share2, Trophy, Gift, Flame, Copy, Check, Users, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function RewardsPage() {
  const { profile } = useUser();
  const [copied, setCopied] = useState(false);
  const currentTier = getRewardTier(profile.points);
  const nextTier = getNextTier(profile.points);
  const allBadges = getAllBadges();

  const copyReferral = () => {
    const url = `${window.location.origin}?ref=${profile.referralCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Your Rewards</h1>
      <p className="text-stone-500 mb-8">
        Share local news, earn points, and unlock exclusive content for Riverside.
      </p>

      {/* Points overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-5 text-center">
          <Gift className="w-6 h-6 text-brand-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-stone-900">{profile.points.toLocaleString()}</div>
          <div className="text-sm text-stone-500">Total Points</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-5 text-center">
          <Share2 className="w-6 h-6 text-brand-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-stone-900">{profile.totalShares}</div>
          <div className="text-sm text-stone-500">Stories Shared</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-5 text-center">
          <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-stone-900">{profile.shareStreak}</div>
          <div className="text-sm text-stone-500">Day Streak</div>
        </div>
      </div>

      {/* Current tier */}
      <section className="bg-white rounded-xl border border-stone-200 p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{currentTier.badge}</span>
          <div>
            <h2 className="text-xl font-bold text-stone-900">{currentTier.name} Tier</h2>
            <p className="text-sm text-stone-500">{currentTier.perks.join(" · ")}</p>
          </div>
        </div>

        {nextTier && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-stone-500">Progress to {nextTier.name}</span>
              <span className="font-semibold text-stone-900">
                {profile.points} / {nextTier.minPoints}
              </span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-3">
              <div
                className="bg-brand-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (profile.points / nextTier.minPoints) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </section>

      {/* Referral */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5" />
          <h2 className="text-xl font-bold">Invite Your Neighbors</h2>
        </div>
        <p className="text-brand-100 text-sm mb-4">
          Share your referral link and earn <strong>50 points</strong> for every new reader who joins.
        </p>
        <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
          <code className="flex-1 text-sm truncate">{profile.referralCode}</code>
          <button
            onClick={copyReferral}
            className="flex items-center gap-1 bg-white text-brand-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-brand-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Link
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-brand-200 mt-2">
          {profile.totalReferrals} referral{profile.totalReferrals !== 1 ? "s" : ""} so far
        </p>
      </section>

      {/* Reward tiers */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" /> Reward Tiers
        </h2>
        <div className="grid gap-3">
          {REWARD_TIERS.map((tier) => {
            const isCurrent = tier.id === currentTier.id;
            const isPast = profile.points >= tier.minPoints;
            return (
              <div
                key={tier.id}
                className={`rounded-xl border p-4 flex items-center gap-4 transition-colors ${
                  isCurrent
                    ? "border-brand-300 bg-brand-50"
                    : isPast
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-stone-200 bg-white"
                }`}
              >
                <span className="text-2xl">{tier.badge}</span>
                <div className="flex-1">
                  <div className="font-semibold text-stone-900">
                    {tier.name}
                    {isCurrent && (
                      <span className="ml-2 text-xs bg-brand-600 text-white px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-500">{tier.minPoints.toLocaleString()}+ points</div>
                  <div className="text-sm text-stone-600 mt-0.5">{tier.perks.join(" · ")}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges */}
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

      {/* Leaderboard */}
      <section id="leaderboard" className="mb-8">
        <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> Community Leaderboard
        </h2>
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 text-left text-xs text-stone-500 uppercase tracking-wider">
                <th className="p-4">Rank</th>
                <th className="p-4">Member</th>
                <th className="p-4 text-right">Points</th>
                <th className="p-4 text-right hidden sm:table-cell">Shares</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.map((entry) => (
                <tr key={entry.rank} className="border-b border-stone-50 last:border-0">
                  <td className="p-4 font-bold text-stone-400">{entry.rank}</td>
                  <td className="p-4">
                    <span className="mr-2">{entry.badge}</span>
                    <span className="font-semibold text-stone-900">{entry.name}</span>
                  </td>
                  <td className="p-4 text-right font-semibold text-stone-900">
                    {entry.points.toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-stone-500 hidden sm:table-cell">{entry.shares}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center bg-stone-100 rounded-xl p-8">
        <h3 className="text-lg font-bold text-stone-900 mb-2">Ready to earn more?</h3>
        <p className="text-stone-500 text-sm mb-4">
          Head back to the latest stories and start sharing to climb the leaderboard.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Browse Latest News
        </Link>
      </div>
    </div>
  );
}
