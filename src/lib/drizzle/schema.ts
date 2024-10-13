import { text, boolean, uuid, pgTable, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
});

export const blog = pgTable("blog", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content"),
  published: boolean("published"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  authorId: text("author_id").references(() => user.id),
});
