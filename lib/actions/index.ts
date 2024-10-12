"use server";

import { db } from "../drizzle";
import { blog, user } from "../drizzle/schema";
import { getUserTokens } from "../firebase/utils";

export async function testAction() {
  const tokens = await getUserTokens();
  console.log("tokens", tokens?.decodedToken);
  return !tokens ? "unauthorize" : "hello world";
}

export async function getBlogs() {
  const data = await db.select().from(blog);

  return data;
}
