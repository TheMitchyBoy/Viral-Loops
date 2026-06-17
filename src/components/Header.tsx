"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { getFollowerPerk, SITE_NAME, CITY_NAME, SITE_TAGLINE } from "@/lib/data";
import { Facebook, Menu, X, Check, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { profile, setFollowTarget, setShowFollowModal } = useUser();
  const perk = getFollowerPerk(profile);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/category/politics", label: "Politics" },
    { href: "/category/investigation", label: "Investigation" },
    { href: "/loops", label: "Loops" },
    { href: "/rewards", label: "Access" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-strong border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between text-[11px]">
          <span className="hidden sm:inline text-zinc-500">
            {CITY_NAME} local news by {SITE_NAME} · verified Facebook access
          </span>
          <span className="sm:hidden text-zinc-500">{SITE_NAME}</span>
          <Link href="/rewards" className="flex items-center gap-1.5 text-zinc-400 hover:text-cyan-300 transition-colors font-medium">
            {profile.followedFacebook && profile.facebookUserId ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>{perk.badge} {perk.name}</span>
              </>
            ) : (
              <>
                <Facebook className="w-3 h-3" />
                <span>Follow to unlock</span>
              </>
            )}
          </Link>
        </div>
      </div>

      <div className="glass-strong border-b border-white/[0.06] backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-[4.25rem]">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <span className="font-display font-bold text-lg text-zinc-950">M</span>
              </div>
              <div>
                <div className="font-display font-bold text-lg tracking-tight leading-none">{SITE_NAME}</div>
                <div className="label-caps mt-0.5">{SITE_TAGLINE}</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-full hover:bg-white/[0.06] transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/loops"
                className="hidden md:flex items-center gap-1.5 btn-secondary !py-2 !px-4 !text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Viral Loops
              </Link>
              {!profile.followedFacebook || !profile.facebookUserId ? (
                <button
                  onClick={() => {
                    setFollowTarget({ id: "follow", slug: "", title: `${SITE_NAME} Exclusive Content` });
                    setShowFollowModal(true);
                  }}
                  className="hidden sm:flex btn-facebook !py-2 !px-4 !text-xs"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  Unlock
                </button>
              ) : null}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="lg:hidden pb-4 border-t border-white/[0.06] pt-3 animate-slide-up">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 px-2 text-sm font-medium text-zinc-400 hover:text-cyan-300 rounded-lg hover:bg-white/[0.04]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
