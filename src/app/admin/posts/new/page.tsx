import { requireAdminPage } from "@/lib/admin/auth-page";
import AdminDashboardShell from "@/components/admin/AdminDashboardShell";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function AdminNewPostPage() {
  await requireAdminPage();
  return (
    <AdminDashboardShell active="new">
      <PostEditor mode="create" />
    </AdminDashboardShell>
  );
}
