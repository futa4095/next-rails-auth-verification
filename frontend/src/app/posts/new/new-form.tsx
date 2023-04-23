'use client';

import { startTransition } from "react";
import { useRouter } from 'next/navigation';

import { Post, createPost } from "@/lib/Post";
import { PostForm } from "../components/PostForm";
import { useSupabase } from "@/app/providers/supabase-provider";

export default function NewForm() {
  const { session } = useSupabase()
  const post = { title: "", body: "" };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, post: Post) => {
    e.preventDefault();
    const token = await session?.access_token ?? ''
    await createPost(post, token);
    router.push("/posts")
    startTransition(() => router.refresh())
  }

  return <PostForm handleSubmit={handleSubmit} post={post} />
}
