import Link from "next/link";
import { formatDate } from "@/app/blog/utils";
import { getBlogs } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Blog from "@/app/blog/[slug]/page";
import { BlogEditorDialog } from "./blog-editor-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { getUserTokens } from "@/lib/firebase/utils";

export async function BlogPosts() {
  const allBlogs = await getBlogs();
  const tokens = await getUserTokens();

  return (
    <div className="flex flex-col gap-1">
      {allBlogs.map((post) => (
        <Card key={post.slug}>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <CardTitle className="text-lg">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>

              <div className="flex flex-col flex-shrink-0">
                <p className="text-sm flex-shrink-0 ctext-neutral-600 dark:text-neutral-400  tabular-nums">
                  {formatDate(post.createdAt, false)}
                </p>
                {!tokens ? null : (
                  <div className="flex flex-row gap-1">
                    <BlogEditorDialog postSlug={post.slug} />
                    <Button variant="ghost" size="sm">
                      <Trash2 />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
