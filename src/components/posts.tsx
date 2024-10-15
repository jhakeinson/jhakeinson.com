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

export async function BlogPosts() {
  const allBlogs = await getBlogs();

  return (
    <div className="flex flex-col gap-1">
      {allBlogs.map((post) => (
        <Card key={post.slug}>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <CardTitle className="text-lg">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>

              <p className="text-sm flex-shrink-0 ctext-neutral-600 dark:text-neutral-400  tabular-nums">
                {formatDate(post.createdAt, false)}
              </p>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
