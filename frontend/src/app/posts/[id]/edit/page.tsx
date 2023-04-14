'use client'

import { startTransition, useState } from "react";
import { useRouter } from 'next/navigation';
import { getPost, updatePost, Post } from "@/lib/Post";

export default async function EditPost({ params }: { params: { id: number } }) {
  // console.log(params);
  const router = useRouter();
  const post = await getPost(params.id);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, post: Post) => {
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

type PostFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  post: Post
}

function PostForm({ handleSubmit, post }: PostFormProps) {
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  return (
    <form onSubmit={(e) => { handleSubmit(e, { id: post.id, title, body }) }}>
      <input type="text" name="title" placeholder="title" onChange={(e) => setTitle(e.target.value)} value={title} />
      <textarea name="body" placeholder="body" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
      <button type="submit">update</button>
    </form>
  )
}
