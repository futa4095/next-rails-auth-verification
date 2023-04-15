'use client';

import { startTransition } from "react";
import { useRouter } from 'next/navigation';

import { Post, createPost } from "@/lib/Post";
import { PostForm } from "../components/PostForm";

export default function NewForm() {
  const post = { title: "", body: "" };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, post: Post) => {
    e.preventDefault();
    await createPost(post);
    router.push("/posts")
    startTransition(() => router.refresh())
  }

  return <PostForm handleSubmit={handleSubmit} post={post} />
}
