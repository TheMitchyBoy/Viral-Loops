"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { getRewardTier } from "@/lib/data";
import { Trophy, Share2, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { profile } = useUser();
  const tier = getRewardTier(profile.points);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/category/politics", label: "Politics" },
    { href: "/category/sports", label: "Sports" },
    { href: "/category/community", label: "Community" },
    { href: "/rewards", label: "Rewards" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="bg-brand-600 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="hidden sm:inline">
            Share local stories, earn rewards & unlock exclusive content
          </span>
          <span className="sm:hidden">Share & earn rewards</span>
          <Link href="/rewards" className="flex items-center gap-1 hover:underline font-medium">
            <Trophy className="w-3 h-3" />
            {profile.points} pts · {tier.badge} {tier.name}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div>
              <div className="font-bold text-xl text-stone-900 leading-tight">Riverside Daily</div>
              <div className="text-[10px] text-stone-500 uppercase tracking-widest">Local News</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/rewards"
              className="hidden sm:flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-brand-100 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share & Earn
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-stone-600"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-stone-100 pt-3 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm font-medium text-stone-600 hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
