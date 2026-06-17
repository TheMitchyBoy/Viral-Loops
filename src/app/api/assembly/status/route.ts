import { NextResponse } from "next/server";
import { getAssemblyConnectionStatus } from "@/lib/assembly/fetch";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getAssemblyConnectionStatus();
  return NextResponse.json(status, { status: status.connected ? 200 : 503 });
}
