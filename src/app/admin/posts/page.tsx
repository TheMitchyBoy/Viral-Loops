import { listAdminPosts } from "@/lib/admin/posts";
import { requireAdminPage } from "@/lib/admin/auth-page";
import AdminDashboardShell from "@/components/admin/AdminDashboardShell";
import PostListTable from "@/components/admin/PostListTable";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  await requireAdminPage();
  const posts = await listAdminPosts();

  return (
    <AdminDashboardShell active="posts">
      <PostListTable posts={posts} />
    </AdminDashboardShell>
  );
}
