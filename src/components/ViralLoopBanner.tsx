"use client";

import { BookOpen, Facebook, Unlock, TrendingUp, MapPin, Vote, Mic, Zap, Target, Store, GraduationCap, Shield, Search, FileCheck } from "lucide-react";
import Link from "next/link";

const LOOPS = [
  { icon: MapPin, title: "Neighborhood Map", desc: "Unlock stories when your zip hits a threshold" },
  { icon: Facebook, title: "Story Credits", desc: "Public credit for readers who spread stories" },
  { icon: BookOpen, title: "Question Unlocks", desc: "Community questions release investigations" },
  { icon: Vote, title: "Live Vote Gates", desc: "Followers vote on what we publish next" },
  { icon: Mic, title: "Voicemail Drops", desc: "Audio exclusives you forward to neighbors" },
  { icon: Zap, title: "Flash Drops", desc: "Limited spots for exclusive PDFs" },
  { icon: Target, title: "Community Release", desc: "500 followers unlocks the full report" },
  { icon: Store, title: "Business Loop", desc: "Check in locally, unlock insider previews" },
  { icon: GraduationCap, title: "Alumni Pride", desc: "Class vs class follower competition" },
  { icon: Shield, title: "Community Roles", desc: "Scout → Witness → Advocate → Insider" },
  { icon: Search, title: "Mystery Serial", desc: "Daily clues + referral bonus intel" },
  { icon: FileCheck, title: "Accountability Receipts", desc: "Share proof you read the full story" },
];

export default function ViralLoopBanner() {
  return (
    <section className="gradient-hero rounded-2xl p-8 md:p-12 text-white my-8">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">12 Viral Loops. One Local Community.</h2>
        <p className="text-stone-300 text-lg">
          Riverside Daily uses neighborhood maps, live votes, mystery serials, and more to turn local news into community-powered growth.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {LOOPS.map((loop) => (
          <div key={loop.title} className="glass rounded-xl p-4 text-center">
            <loop.icon className="w-5 h-5 text-brand-300 mx-auto mb-2" />
            <h3 className="font-bold text-xs mb-1">{loop.title}</h3>
            <p className="text-[10px] text-stone-400 leading-snug">{loop.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/loops"
          className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Unlock className="w-5 h-5" />
          Open Viral Loops Hub
        </Link>
        <Link
          href="/rewards"
          className="inline-flex items-center justify-center gap-2 glass text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
        >
          <TrendingUp className="w-5 h-5" />
          Your Access & Badges
        </Link>
      </div>
    </section>
  );
}
