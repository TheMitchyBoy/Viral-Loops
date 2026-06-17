"use client";

import { BookOpen, Facebook, Unlock, TrendingUp, MapPin, Vote, Mic, Zap, Target, Store, GraduationCap, Shield, Search, FileCheck } from "lucide-react";
import Link from "next/link";

const LOOPS = [
  { icon: MapPin, title: "Neighborhood Map", desc: "Zip thresholds unlock zone stories" },
  { icon: Facebook, title: "Story Credits", desc: "Public credit for referrers" },
  { icon: BookOpen, title: "Question Unlocks", desc: "Community shapes investigations" },
  { icon: Vote, title: "Live Vote Gates", desc: "Followers vote on publishing" },
  { icon: Mic, title: "Voicemail Drops", desc: "Forward audio to neighbors" },
  { icon: Zap, title: "Flash Drops", desc: "Limited exclusive assets" },
  { icon: Target, title: "Community Release", desc: "500 followers unlock report" },
  { icon: Store, title: "Business Loop", desc: "Local check-in perks" },
  { icon: GraduationCap, title: "Alumni Pride", desc: "Class vs class competition" },
  { icon: Shield, title: "Community Roles", desc: "Scout → Insider progression" },
  { icon: Search, title: "Mystery Serial", desc: "Daily clues + bonus intel" },
  { icon: FileCheck, title: "Receipts", desc: "Proof you read the full story" },
];

export default function ViralLoopBanner() {
  return (
    <section className="gradient-hero rounded-3xl p-8 md:p-12 my-10 relative">
      <div className="relative z-10">
        <p className="label-caps text-cyan-400/70 mb-3 text-center">Community Engine</p>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-gradient">12 Viral Loops</span>
            <br />
            <span className="text-zinc-300">One Local Community</span>
          </h2>
          <p className="text-zinc-500 text-base md:text-lg leading-relaxed">
            Neighborhood maps, live votes, mystery serials — engineered to turn Riverside readers into a growth network.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 mb-10">
          {LOOPS.map((loop) => (
            <div key={loop.title} className="glass rounded-2xl p-4 text-center hover:bg-white/[0.06] transition-colors group">
              <loop.icon className="w-5 h-5 text-cyan-400/80 mx-auto mb-2 group-hover:text-cyan-300 transition-colors" />
              <h3 className="font-display font-semibold text-xs mb-1 text-zinc-200">{loop.title}</h3>
              <p className="text-[10px] text-zinc-500 leading-snug">{loop.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/loops" className="btn-primary">
            <Unlock className="w-4 h-4" />
            Open Loops Hub
          </Link>
          <Link href="/rewards" className="btn-secondary">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Access & Badges
          </Link>
        </div>
      </div>
    </section>
  );
}
