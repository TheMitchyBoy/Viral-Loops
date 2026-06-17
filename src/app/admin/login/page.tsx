import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin/posts");

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full flex flex-col items-center gap-4">
        {!isAdminConfigured() && (
          <p className="text-sm text-amber-400/90 text-center max-w-md">
            Set <code className="text-cyan-400">ADMIN_PASSWORD</code> in your environment to enable the dashboard.
          </p>
        )}
        <AdminLoginForm />
      </div>
    </div>
  );
}
