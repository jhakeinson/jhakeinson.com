import { NextRequest } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import { firebaseClientConfig, firebaseServerConfig } from "./config";

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: firebaseClientConfig.apiKey,
    cookieName: firebaseServerConfig.cookieName,
    cookieSignatureKeys: firebaseServerConfig.cookieSignatureKeys,
    cookieSerializeOptions: firebaseServerConfig.cookieSerializeOptions,
    serviceAccount: firebaseServerConfig.serviceAccount,
  });
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\.).*)", "/api/login", "/api/logout"],
};
