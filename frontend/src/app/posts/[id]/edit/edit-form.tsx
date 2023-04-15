'use client';

import { startTransition } from "react";
import { useRouter } from 'next/navigation';

import { Post, updatePost } from "@/lib/Post";
import { PostForm } from "../../components/PostForm";

export default function EditForm({ post }: { post: Post }) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, post: Post) => {
    e.preventDefault();
    await updatePost(post);
    router.push("/posts");
    startTransition(() => router.refresh());
  }

  return <PostForm handleSubmit={handleSubmit} post={post} />
}
