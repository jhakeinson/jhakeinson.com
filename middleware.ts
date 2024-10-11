import { NextRequest, NextResponse } from "next/server";
import { redirectToHome, authMiddleware } from "next-firebase-auth-edge";
import { firebaseClientConfig, firebaseServerConfig } from "./config";
import { getUserTokens } from "./lib/firebase/utils";

const PUBLIC_PATHS = ["/register", "/login"];

export async function middleware(request: NextRequest) {
  if (!["/api/login", "/api/logout"].includes(request.nextUrl.pathname)) {
    if (request.nextUrl.pathname.startsWith("/api")) {
      const tokens = await getUserTokens();

      if (!tokens) {
        return NextResponse.json(
          {
            message: "Missing or malformed credentials",
          },
          { status: 401 },
        );
      }
    }
  }

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
    // handleInvalidToken: async (reason) => {
    //   console.info("Missing or malformed credentials", { reason });
    //
    //   // if pathname starts with /api, retyrn 401
    //   console.info("path: ", request.nextUrl.pathname);
    //   if (request.nextUrl.pathname.startsWith("/api")) {
    //     return NextResponse.json(
    //       {
    //         message: "Missing or malformed credentials",
    //       },
    //       { status: 401 },
    //     );
    //   }
    //
    //   return NextResponse.next();
    // },
    serviceAccount: firebaseServerConfig.serviceAccount,
  });
}

export const config = {
  matcher: [
    "/",
    "/api/(.*)",
    "/((?!_next|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
