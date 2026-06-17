import { notFound } from "next/navigation";
import { getAdminPost } from "@/lib/admin/posts";
import { requireAdminPage } from "@/lib/admin/auth-page";
import AdminDashboardShell from "@/components/admin/AdminDashboardShell";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function AdminEditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();
  const { id } = await params;
  const post = await getAdminPost(id);
  if (!post) notFound();

  return (
    <AdminDashboardShell>
      <PostEditor mode="edit" initial={post} />
    </AdminDashboardShell>
  );
}
