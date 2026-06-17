import "server-only";

import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "./auth";

export async function requireAdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");
}
