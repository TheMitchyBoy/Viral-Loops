"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { POST_CATEGORIES } from "@/lib/admin/constants";
import type { AdminPostInput } from "@/lib/admin/posts";
import { Upload, Save, Trash2, ArrowLeft } from "lucide-react";

interface PostEditorProps {
  initial?: AdminPostInput | null;
  mode: "create" | "edit";
}

const emptyPost = (): AdminPostInput => ({
  slug: "",
  type: "article",
  tier: "free",
  title: "",
  excerpt: "",
  body: "",
  category: "Politics",
  author: "Mitchel Turner",
  publishedAt: new Date().toISOString(),
  readTime: null,
  duration: null,
  imageUrl: null,
  videoUrl: null,
  tags: [],
  followerCount: 0,
  viewCount: 0,
  featured: false,
});

export default function PostEditor({ initial, mode }: PostEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<AdminPostInput>(initial ?? emptyPost());
  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (initial) {
      setForm(initial);
      setTagsInput(initial.tags.join(", "));
    }
  }, [initial]);

  function updateField<K extends keyof AdminPostInput>(key: K, value: AdminPostInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = (await res.json()) as { url?: string; error?: string };

    if (!res.ok) {
      setError(data.error ?? "Upload failed");
      setUploading(false);
      return;
    }

    updateField("imageUrl", data.url ?? null);
    setMessage("Image uploaded");
    setUploading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const payload: AdminPostInput = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      publishedAt: new Date(form.publishedAt).toISOString(),
    };

    const url = mode === "edit" && form.id ? `/api/admin/posts/${form.id}` : "/api/admin/posts";
    const method = mode === "edit" ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as { error?: string; post?: { id: string } };

    if (!res.ok) {
      setError(data.error ?? "Save failed");
      setSaving(false);
      return;
    }

    setMessage("Saved");
    setSaving(false);

    if (mode === "create" && data.post?.id) {
      router.push(`/admin/posts/${data.post.id}/edit`);
      router.refresh();
    } else {
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!form.id || !confirm("Delete this post from the database?")) return;

    const res = await fetch(`/api/admin/posts/${form.id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete post");
      return;
    }

    router.push("/admin/posts");
    router.refresh();
  }

  const previewImage = form.imageUrl?.trim() || null;

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/posts" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-cyan-400 mb-2">
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {mode === "create" ? "New post" : "Edit post"}
          </h1>
        </div>
        <div className="flex gap-2">
          {mode === "edit" && form.id && (
            <button type="button" onClick={handleDelete} className="btn-secondary inline-flex items-center gap-2 text-rose-300">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" disabled={saving} className="btn-primary inline-flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save post"}
          </button>
        </div>
      </div>

      {(error || message) && (
        <div className={`text-sm px-4 py-3 rounded-xl ring-1 ${error ? "text-rose-300 bg-rose-500/10 ring-rose-500/20" : "text-emerald-300 bg-emerald-500/10 ring-emerald-500/20"}`}>
          {error || message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-5 space-y-4">
            <div>
              <label className="label-caps block mb-2">Title</label>
              <input
                className="admin-input"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label-caps block mb-2">Slug</label>
              <input
                className="admin-input font-mono text-sm"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label-caps block mb-2">Excerpt</label>
              <textarea
                className="admin-input min-h-20"
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label-caps block mb-2">Body (Markdown)</label>
              <textarea
                className="admin-input min-h-64 font-mono text-sm"
                value={form.body ?? ""}
                onChange={(e) => updateField("body", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <h2 className="font-display font-bold">Cover image</h2>

            {previewImage ? (
              <div className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-white/[0.08]">
                <Image src={previewImage} alt="Cover preview" fill className="object-cover" unoptimized={previewImage.startsWith("/uploads/")} />
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-white/[0.03] ring-1 ring-white/[0.08] flex items-center justify-center text-sm text-zinc-600">
                No image — themed placeholder on site
              </div>
            )}

            <div>
              <label className="label-caps block mb-2">Image URL</label>
              <input
                className="admin-input text-sm"
                value={form.imageUrl ?? ""}
                onChange={(e) => updateField("imageUrl", e.target.value || null)}
                placeholder="https://… or /uploads/posts/…"
              />
            </div>

            <label className="btn-secondary w-full inline-flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleUpload(file);
                }}
              />
            </label>
          </div>

          <div className="card p-5 space-y-4">
            <h2 className="font-display font-bold">Settings</h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps block mb-2">Type</label>
                <select className="admin-input" value={form.type} onChange={(e) => updateField("type", e.target.value as AdminPostInput["type"])}>
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <label className="label-caps block mb-2">Tier</label>
                <select className="admin-input" value={form.tier} onChange={(e) => updateField("tier", e.target.value as AdminPostInput["tier"])}>
                  <option value="free">Free</option>
                  <option value="follow-unlock">Follow unlock</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-caps block mb-2">Category</label>
              <select className="admin-input" value={form.category} onChange={(e) => updateField("category", e.target.value)}>
                {POST_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-caps block mb-2">Published</label>
              <input
                type="datetime-local"
                className="admin-input"
                value={form.publishedAt.slice(0, 16)}
                onChange={(e) => updateField("publishedAt", new Date(e.target.value).toISOString())}
              />
            </div>

            <div>
              <label className="label-caps block mb-2">Tags (comma-separated)</label>
              <input className="admin-input" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="politics, assembly" />
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={form.featured ?? false} onChange={(e) => updateField("featured", e.target.checked)} />
              Featured on homepage
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
