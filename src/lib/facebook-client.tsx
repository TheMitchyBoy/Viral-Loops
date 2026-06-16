"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { FACEBOOK_APP_ID } from "@/lib/facebook-config";

export function useFacebookSDK() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!FACEBOOK_APP_ID) return;

    window.fbAsyncInit = () => {
      window.FB?.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: false,
        version: "v21.0",
      });
      setReady(true);
    };

    if (window.FB) {
      setReady(true);
    }
  }, []);

  return { ready, configured: Boolean(FACEBOOK_APP_ID) };
}

export default function FacebookSDK() {
  const { configured } = useFacebookSDK();

  if (!configured) return null;

  return (
    <Script
      id="facebook-jssdk"
      strategy="afterInteractive"
      src="https://connect.facebook.net/en_US/sdk.js"
    />
  );
}

export function loginWithFacebook(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error("Facebook SDK is not loaded yet"));
      return;
    }

    window.FB.login(
      (response) => {
        const token = response.authResponse?.accessToken;
        if (token) {
          resolve(token);
          return;
        }

        if (response.status === "not_authorized") {
          reject(new Error("Facebook permissions were not granted"));
          return;
        }

        reject(new Error("Facebook login was cancelled"));
      },
      {
        scope: "public_profile,user_likes",
        auth_type: "rerequest",
        return_scopes: true,
      }
    );
  });
}

export async function verifyFacebookFollow(accessToken: string) {
  const response = await fetch("/api/facebook/verify-follow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken }),
  });

  const data = (await response.json()) as {
    verified?: boolean;
    userId?: string;
    name?: string;
    error?: string;
  };

  if (!response.ok || !data.verified) {
    throw new Error(data.error ?? "Could not verify Facebook follow");
  }

  return data;
}
