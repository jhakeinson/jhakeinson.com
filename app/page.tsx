import { BlogPosts } from "app/components/posts";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { firebaseClientConfig, firebaseServerConfig } from "@/config";

export default async function Page() {
  const tokens = await getTokens(cookies(), {
    apiKey: firebaseClientConfig.apiKey,
    cookieName: firebaseServerConfig.cookieName,
    cookieSignatureKeys: firebaseServerConfig.cookieSignatureKeys,
    serviceAccount: firebaseServerConfig.serviceAccount,
  });
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jhake Inson {!tokens ? "" : `| Logged In`}
      </h1>
      <p className="mb-4">
        {`Hi, I'm Jhake Inson, a Full Stack Web Developer and GenAI Integrator with over 4 years of experience building powerful, user-friendly web applications. Whether I’m working on back-end logic with NodeJS or enhancing front-end experiences with React and NextJS, I love creating tech that works seamlessly. Lately, I’ve been diving deep into Generative AI features, like RAG and chatbot integration with tools such as Langchain and OpenAI—it's exciting to bring intelligence into my apps! When I’m not coding on my Linux system (always with Neovim open), you’ll probably find me blasting Linkin Park or hanging out with my cats. And while I may be a bit slow on the keyboard due to a neurological condition, my brain works fast, allowing me to solve complex problems with ease and precision, one keystroke at a time.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
