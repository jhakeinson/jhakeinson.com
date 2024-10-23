import { formatDate } from "@/app/blog/utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogs } from "@/lib/actions";
import { getUserTokens } from "@/lib/firebase/utils";
import Link from "next/link";
import { BlogEditorDialog } from "./blog-editor-dialog";
import DeletePost from "./delete-post";

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
                    <DeletePost postSlug={post.slug} />
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
