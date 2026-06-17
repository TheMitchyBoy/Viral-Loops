export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#030304]">{children}</div>;
}
