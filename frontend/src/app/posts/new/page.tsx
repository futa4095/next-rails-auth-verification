'use client'

import { startTransition, useState } from "react";
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  console.log('create post')
  const router = useRouter();
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    router.push("/posts")
    // startTransition(() => router.refresh())
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          create post
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
          <textarea name="body" placeholder="body" onChange={(e) => setBody(e.target.value)}></textarea>
          <button type="submit">save</button>
        </form>
      </div>
    </main>
  )
}
