'use client';

import { deletePost, getPost } from "@/lib/Post";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function ShowPost({ params }: { params: { id: number } }) {
  const router = useRouter();
  const handleDelete = async () => {
    await deletePost(params.id);
    router.push("/posts")
  }

  const post = await getPost(params.id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          show post
        </p>
      </div>
      <p>{post.title}</p>
      <p>{post.body}</p>
      <Link href={`/posts/${params.id}/edit`}>edit</Link>
      <button onClick={handleDelete}>delete</button>
    </main>
  )
}
