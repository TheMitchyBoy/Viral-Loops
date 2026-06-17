import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/auth";
import { deleteAdminPost, getAdminPost, upsertAdminPost, type AdminPostInput } from "@/lib/admin/posts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = requireAdminApi(request);
  if (authError) return authError;

  const { id } = await params;
  const post = await getAdminPost(id);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = requireAdminApi(request);
  if (authError) return authError;

  const { id } = await params;

  try {
    const body = (await request.json()) as AdminPostInput;
    const post = await upsertAdminPost({ ...body, id });
    return NextResponse.json({ post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save post";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = requireAdminApi(request);
  if (authError) return authError;

  const { id } = await params;

  try {
    await deleteAdminPost(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Post not found or could not be deleted" }, { status: 404 });
  }
}
