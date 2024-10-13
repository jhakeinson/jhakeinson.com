"use server";
import { firebaseClientConfig, firebaseServerConfig } from "@/config";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

export async function getUserTokens() {
  const tokens = await getTokens(cookies(), {
    apiKey: firebaseClientConfig.apiKey,
    cookieName: firebaseServerConfig.cookieName,
    cookieSignatureKeys: firebaseServerConfig.cookieSignatureKeys,
    serviceAccount: firebaseServerConfig.serviceAccount,
  });

  return tokens;
}
