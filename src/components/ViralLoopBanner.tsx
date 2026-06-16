"use client";

import { BookOpen, Facebook, Unlock, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ViralLoopBanner() {
  const steps = [
    { icon: BookOpen, title: "Read & Watch", desc: "Explore free local news, videos, and community updates" },
    { icon: Facebook, title: "Follow on Facebook", desc: "Follow Riverside Daily to join our local news community" },
    { icon: Unlock, title: "Unlock Exclusives", desc: "Get instant access to investigations, bonus videos, and insider previews" },
    { icon: TrendingUp, title: "Stay Informed", desc: "Breaking news and exclusive content delivered via Facebook" },
  ];

  return (
    <section className="gradient-hero rounded-2xl p-8 md:p-12 text-white my-8">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Follow Us, Unlock the Full Story
        </h2>
        <p className="text-stone-300 text-lg">
          Riverside Daily keeps critical local news free for everyone.
          Follow us on Facebook to unlock exclusive investigations, extended videos, and insider content.
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
          className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Facebook className="w-5 h-5" />
          See What You Unlock
        </Link>
      </div>
    </section>
  );
}
