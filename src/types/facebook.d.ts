export interface FacebookLoginResponse {
  authResponse?: {
    accessToken: string;
    userID: string;
    expiresIn: number;
  };
  status: string;
}

export interface FacebookStatic {
  init(params: { appId: string; cookie: boolean; xfbml: boolean; version: string }): void;
  login(
    callback: (response: FacebookLoginResponse) => void,
    options?: { scope?: string; auth_type?: string; return_scopes?: boolean }
  ): void;
  getLoginStatus(callback: (response: FacebookLoginResponse) => void): void;
}

declare global {
  interface Window {
    FB?: FacebookStatic;
    fbAsyncInit?: () => void;
  }
}

export {};
