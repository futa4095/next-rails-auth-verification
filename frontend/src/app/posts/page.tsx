import { getPosts } from "@/lib/Post";
import { createServerClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function Posts() {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(await supabase.auth.getUser());
  // supabase.auth.updateUser({ data: { hello: "world!" } });
  const posts = await getPosts(session?.access_token ?? "");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          posts
        </p>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
