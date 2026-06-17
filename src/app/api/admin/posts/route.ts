import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { listAdminPosts, upsertAdminPost, type AdminPostInput } from "@/lib/admin/posts";

export async function GET(request: NextRequest) {
  const authError = requireAdminApi(request);
  if (authError) return authError;

  const posts = await listAdminPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const authError = requireAdminApi(request);
  if (authError) return authError;

  try {
    const body = (await request.json()) as AdminPostInput;
    const post = await upsertAdminPost(body);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save post";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
