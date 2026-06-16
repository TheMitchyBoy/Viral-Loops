import Link from "next/link";
import { Share2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-white font-bold text-lg">Riverside Daily</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted source for Riverside local news. Share stories, earn rewards, and unlock exclusive community content.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Sections</h3>
            <ul className="space-y-2 text-sm">
              {["Politics", "Sports", "Community", "Education", "Investigation"].map((cat) => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase()}`} className="hover:text-white transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Rewards Program</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/rewards" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/rewards#leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link href="/rewards#badges" className="hover:text-white transition-colors">Badges</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Share & Grow</h3>
            <p className="text-sm mb-3">
              Help us grow Riverside&apos;s most informed community. Every share earns you points and unlocks bonus content.
            </p>
            <div className="flex gap-2">
              <Share2 className="w-5 h-5 text-brand-400" />
              <Mail className="w-5 h-5 text-brand-400" />
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-8 text-xs text-center">
          © 2026 Riverside Daily. Built with viral loop technology to keep our community informed.
        </div>
      </div>
    </footer>
  );
}
