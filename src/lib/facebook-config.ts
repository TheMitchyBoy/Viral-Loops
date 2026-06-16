export const FACEBOOK_PAGE_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL ?? "https://www.facebook.com/riversidedaily";

export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "";

export const FACEBOOK_PAGE_ID = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID ?? "";

export function isFacebookConfigured(): boolean {
  return Boolean(
    FACEBOOK_APP_ID &&
      process.env.FACEBOOK_APP_SECRET &&
      FACEBOOK_PAGE_ID
  );
}

export function isFacebookClientConfigured(): boolean {
  return Boolean(FACEBOOK_APP_ID && FACEBOOK_PAGE_ID);
}
