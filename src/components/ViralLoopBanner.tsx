"use client";

import { Share2, Users, Gift, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ViralLoopBanner() {
  const steps = [
    { icon: Share2, title: "Read & Watch", desc: "Explore local news, videos, and investigations" },
    { icon: Gift, title: "Share & Earn", desc: "Share stories on social media to earn reward points" },
    { icon: Users, title: "Refer Friends", desc: "Invite neighbors with your unique referral link" },
    { icon: TrendingUp, title: "Unlock More", desc: "Access exclusive content, bonus videos, and Insider reports" },
  ];

  return (
    <section className="gradient-hero rounded-2xl p-8 md:p-12 text-white my-8">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          The More You Share, The More You Know
        </h2>
        <p className="text-stone-300 text-lg">
          Riverside Daily rewards readers who help spread important local news.
          Share stories, earn points, and unlock exclusive investigations and bonus content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {steps.map((step, i) => (
          <div key={step.title} className="glass rounded-xl p-5 text-center">
            <div className="w-10 h-10 bg-brand-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <step.icon className="w-5 h-5 text-brand-300" />
            </div>
            <div className="text-xs text-brand-300 font-semibold mb-1">Step {i + 1}</div>
            <h3 className="font-bold mb-1">{step.title}</h3>
            <p className="text-sm text-stone-400">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/rewards"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Gift className="w-5 h-5" />
          View Your Rewards
        </Link>
      </div>
    </section>
  );
}
