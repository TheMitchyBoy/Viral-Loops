"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Pencil, Plus } from "lucide-react";
import { isAssemblyPostId } from "@/lib/admin/constants";

interface PostListTableProps {
  posts: NewsItem[];
}

export default function PostListTable({ posts }: PostListTableProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-sm text-zinc-500 mt-1">{posts.length} stories · edit content and cover images</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary inline-flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" /> New post
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-left text-zinc-500">
                <th className="p-4 font-medium">Cover</th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium hidden md:table-cell">Category</th>
                <th className="p-4 font-medium hidden lg:table-cell">Source</th>
                <th className="p-4 font-medium hidden sm:table-cell">Published</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden ring-1 ring-white/[0.08]">
                      <Image src={post.imageUrl} alt="" fill className="object-cover" />
                    </div>
                  </td>
                  <td className="p-4 max-w-xs">
                    <div className="font-medium text-zinc-200 line-clamp-2">{post.title}</div>
                    <div className="text-xs text-zinc-600 mt-1 truncate">{post.slug}</div>
                  </td>
                  <td className="p-4 hidden md:table-cell text-zinc-400">{post.category}</td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className={`chip !text-[10px] ${isAssemblyPostId(post.id) ? "!border-cyan-500/30 !bg-cyan-500/10" : ""}`}>
                      {isAssemblyPostId(post.id) ? "Assembly" : "Curated"}
                    </span>
                  </td>
                  <td className="p-4 hidden sm:table-cell text-zinc-500 whitespace-nowrap">{formatDate(post.publishedAt)}</td>
                  <td className="p-4">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
