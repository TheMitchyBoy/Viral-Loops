import AdminNav from "@/components/admin/AdminNav";

interface AdminDashboardShellProps {
  children: React.ReactNode;
  active?: "posts" | "new";
}

export default function AdminDashboardShell({ children, active }: AdminDashboardShellProps) {
  return (
    <>
      <AdminNav active={active} />
      <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
    </>
  );
}
