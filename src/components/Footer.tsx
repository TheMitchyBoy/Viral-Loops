import Link from "next/link";
import { Facebook, Sparkles } from "lucide-react";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06]">
      <div className="glow-line mb-0" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <span className="font-display font-bold text-zinc-950">M</span>
              </div>
              <span className="font-display font-bold text-lg">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {SITE_TAGLINE}. Community-powered viral loops. Verified exclusive access.
            </p>
          </div>

          <div>
            <h3 className="label-caps mb-4">Sections</h3>
            <ul className="space-y-2.5 text-sm">
              {["Politics", "Investigation", "Community", "Education", "Food", "Events"].map((cat) => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase()}`} className="text-zinc-500 hover:text-cyan-300 transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-caps mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/loops" className="text-zinc-500 hover:text-cyan-300 transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Viral Loops</Link></li>
              <li><Link href="/rewards" className="text-zinc-500 hover:text-cyan-300 transition-colors">Access & Badges</Link></li>
              <li><Link href="/rewards#perks" className="text-zinc-500 hover:text-cyan-300 transition-colors">What You Unlock</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="label-caps mb-4">Connect</h3>
            <p className="text-sm text-zinc-500 mb-4">
              Follow on Facebook for breaking alerts and verified exclusive content.
            </p>
            <Facebook className="w-5 h-5 text-cyan-400/70" />
          </div>
        </div>

        <div className="glow-line my-10" />
        <p className="text-xs text-zinc-600 text-center">
          © 2026 {SITE_NAME} · Designed for the community
        </p>
      </div>
    </footer>
  );
}
