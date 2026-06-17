import Link from "next/link";
import { LayoutDashboard, FileText, Plus, LogOut, ExternalLink } from "lucide-react";
import { SITE_NAME } from "@/lib/brand";

interface AdminNavProps {
  active?: "posts" | "new";
}

export default function AdminNav({ active }: AdminNavProps) {
  return (
    <header className="border-b border-white/[0.08] bg-zinc-950/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/admin/posts" className="font-display font-bold text-sm tracking-tight">
            {SITE_NAME} <span className="text-cyan-400">Admin</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/admin/posts"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                active === "posts" ? "bg-white/[0.08] text-zinc-100" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Posts
            </Link>
            <Link
              href="/admin/posts/new"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                active === "new" ? "bg-white/[0.08] text-zinc-100" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              <Plus className="w-4 h-4" /> New post
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/" className="btn-secondary !py-1.5 !px-3 !text-xs inline-flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5" /> View site
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.06]"
            >
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
