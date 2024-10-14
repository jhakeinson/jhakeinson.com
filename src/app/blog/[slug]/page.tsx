import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { baseUrl } from "@/app/sitemap";
import { getBlogBySlug } from "@/lib/actions";

export async function generateMetadata({ params }) {
  const post = await getBlogBySlug(params.slug);
  if (!post) {
    return {};
  }

  const {
    title,
    createdAt,
    // summary: description,
    // image,
  } = post;
  // const ogImage = image
  //   ? image
  //   : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description: "A nice blog.",
    openGraph: {
      title,
      description: "Blog post",
      type: "article",
      publishedTime: createdAt.toLocaleDateString("en-US"),
      url: `${baseUrl}/blog/${post.slug}`,
      // images: [
      //   {
      //     url: ogImage,
      //   },
      // ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Blog post",
      // images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  console.log("md: ", post.content.replace("\\n", "\n"));

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.createdAt.toLocaleString("en-US"),
            dateModified: post.createdAt.toLocaleString("en-US"),
            description: "Blog post",
            // image: post.metadata.image
            //   ? `${baseUrl}${post.metadata.image}`
            //   : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Jhake Inson",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.createdAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content?.replace("\\n", "\n")} />
      </article>
    </section>
  );
}
