CREATE TABLE IF NOT EXISTS "blog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"published" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"author_id" text,
	CONSTRAINT "blog_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"emaul" text NOT NULL,
	"display_name" text,
	CONSTRAINT "user_emaul_unique" UNIQUE("emaul")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog" ADD CONSTRAINT "blog_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
