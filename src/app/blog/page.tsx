import { BlogEditorDialog } from "@/components/blog-editor-dialog";
import { BlogPosts } from "@/components/posts";
import { getUserTokens } from "@/lib/firebase/utils";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default async function Page() {
  const tokens = await getUserTokens();
  return (
    <section>
      <div className="flex flex-row gap-1">
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          My Blog
        </h1>
        {tokens ? <BlogEditorDialog /> : null}
      </div>
      <BlogPosts />
    </section>
  );
}
