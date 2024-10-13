import { NextRequest, NextResponse } from "next/server";
import { redirectToHome, authMiddleware } from "next-firebase-auth-edge";
import { firebaseClientConfig, firebaseServerConfig } from "@/config";

const PUBLIC_PATHS = ["/register", "/login"];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: firebaseClientConfig.apiKey,
    cookieName: firebaseServerConfig.cookieName,
    cookieSignatureKeys: firebaseServerConfig.cookieSignatureKeys,
    cookieSerializeOptions: firebaseServerConfig.cookieSerializeOptions,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    serviceAccount: firebaseServerConfig.serviceAccount,
  });
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\.).*)", "/api/login", "/api/logout"],
};
