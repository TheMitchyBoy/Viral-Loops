import { NextRequest, NextResponse } from "next/server";
import { verifyFacebookPageFollow } from "@/lib/facebook-verify";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { accessToken?: string };
    const accessToken = body.accessToken?.trim();

    if (!accessToken) {
      return NextResponse.json({ verified: false, error: "Missing Facebook access token" }, { status: 400 });
    }

    const result = await verifyFacebookPageFollow(accessToken);

    if (!result.verified) {
      return NextResponse.json(result, { status: 403 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { verified: false, error: "Unable to verify Facebook follow status" },
      { status: 500 }
    );
  }
}
