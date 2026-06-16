import Link from "next/link";
import { Facebook } from "lucide-react";

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
              Your trusted source for Riverside local news. Follow us on Facebook to unlock exclusive investigations and bonus content.
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
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Exclusive Access</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/rewards" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/rewards#perks" className="hover:text-white transition-colors">What You Unlock</Link></li>
              <li><Link href="/rewards#badges" className="hover:text-white transition-colors">Badges</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Follow Us</h3>
            <p className="text-sm mb-3">
              Follow Riverside Daily on Facebook for breaking news alerts and exclusive local content.
            </p>
            <Facebook className="w-5 h-5 text-blue-400" />
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-8 text-xs text-center">
          © 2026 Riverside Daily. Follow on Facebook to unlock exclusive local news content.
        </div>
      </div>
    </footer>
  );
}
