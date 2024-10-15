"use server";

import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { blog } from "../drizzle/schema";
import { getUserTokens } from "../firebase/utils";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

type BlogInsertType = typeof blog.$inferInsert & { authorId?: string | null };

export async function testAction() {
  const tokens = await getUserTokens();
  console.log("tokens", tokens?.decodedToken);
  return !tokens ? "unauthorize" : "hello world";
}

export async function getBlogs() {
  const data = await db.select().from(blog);

  return data;
}

export async function getBlogBySlug(slug: string) {
  const data = await db.select().from(blog).where(eq(blog.slug, slug));

  return data.length === 0 ? null : data[0];
}

export async function createBlog(newBlog: BlogInsertType) {
  try {
    const tokens = await getUserTokens();

    if (!tokens) {
      throw new Error("unauthorize");
    }

    const result = await db.insert(blog).values({
      authorId: tokens.decodedToken.uid,
      title: newBlog.title,
      slug: newBlog.slug,
      content: newBlog.content,
      published: newBlog.published,
    });

    revalidatePath("/blog");

    return result.rowCount;
  } catch (error: unknown) {
    throw error;
  }
}
