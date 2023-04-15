'use client'

import { startTransition } from "react";
import { useRouter } from 'next/navigation';
import { getPost, updatePost, Post } from "@/lib/Post";
import { PostForm } from "../../components/PostForm";

export default async function EditPost({ params }: { params: { id: number } }) {
  const router = useRouter();
  const post = await getPost(params.id);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, post: Post) => {
    const data = Object.fromEntries(new FormData(e.currentTarget))
    e.preventDefault();
    await updatePost(post);
    router.push("/posts")
    startTransition(() => router.refresh())
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          edit post
        </p>
        <PostForm handleSubmit={handleSubmit} post={post} />
      </div>
    </main>
  )
}
