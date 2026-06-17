import {
  FACEBOOK_APP_ID,
  FACEBOOK_PAGE_ID,
  isFacebookConfigured,
} from "./facebook-config";
import { SITE_NAME } from "./brand";

const GRAPH_VERSION = "v21.0";

export interface FollowVerificationResult {
  verified: boolean;
  userId?: string;
  name?: string;
  error?: string;
}

function getAppSecret(): string {
  const secret = process.env.FACEBOOK_APP_SECRET;
  if (!secret) throw new Error("Facebook app secret is not configured");
  return secret;
}

async function graphGet<T>(path: string, accessToken: string): Promise<T> {
  const url = `https://graph.facebook.com/${GRAPH_VERSION}${path}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 0 },
  });

  const data = (await response.json()) as T & { error?: { message: string; code?: number } };
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data;
}

async function validateUserToken(accessToken: string): Promise<{ userId: string; name?: string }> {
  const appToken = `${FACEBOOK_APP_ID}|${getAppSecret()}`;
  const debug = await graphGet<{
    data: { is_valid: boolean; user_id: string };
  }>(`/debug_token?input_token=${encodeURIComponent(accessToken)}`, appToken);

  if (!debug.data?.is_valid || !debug.data.user_id) {
    throw new Error("Invalid or expired Facebook login");
  }

  const profile = await graphGet<{ id: string; name?: string }>(
    `/me?fields=id,name`,
    accessToken
  );

  return { userId: profile.id, name: profile.name };
}

async function userLikesPage(userAccessToken: string, pageId: string): Promise<boolean> {
  try {
    const targeted = await graphGet<{ data: Array<{ id: string; name?: string }> }>(
      `/me/likes?target_id=${encodeURIComponent(pageId)}&limit=1`,
      userAccessToken
    );

    if (targeted.data?.length > 0) {
      return true;
    }
  } catch {
    // target_id filter may be unavailable for some tokens; fall back to paginated scan
  }

  let url: string | null =
    `https://graph.facebook.com/${GRAPH_VERSION}/me/likes?limit=100&fields=id,name&access_token=${encodeURIComponent(userAccessToken)}`;
  let pagesChecked = 0;

  while (url && pagesChecked < 500) {
    const response = await fetch(url, { next: { revalidate: 0 } });
    const batch = (await response.json()) as {
      data?: Array<{ id: string; name?: string }>;
      paging?: { next?: string };
      error?: { message: string };
    };

    if (batch.error) {
      throw new Error(batch.error.message);
    }

    if (batch.data?.some((like) => like.id === pageId)) {
      return true;
    }

    pagesChecked += batch.data?.length ?? 0;
    url = batch.paging?.next ?? null;
  }

  return false;
}

export async function verifyFacebookPageFollow(
  userAccessToken: string
): Promise<FollowVerificationResult> {
  if (!isFacebookConfigured()) {
    return {
      verified: false,
      error:
        "Facebook verification is not configured. Set NEXT_PUBLIC_FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, and NEXT_PUBLIC_FACEBOOK_PAGE_ID.",
    };
  }

  try {
    const { userId, name } = await validateUserToken(userAccessToken);
    const follows = await userLikesPage(userAccessToken, FACEBOOK_PAGE_ID);

    if (!follows) {
      return {
        verified: false,
        userId,
        name,
        error:
          `We couldn't verify that you follow our Facebook page. Please like or follow ${SITE_NAME} on Facebook, then try again.`,
      };
    }

    return { verified: true, userId, name };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Verification failed";
    return { verified: false, error: message };
  }
}
