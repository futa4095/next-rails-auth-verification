"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

import { Post, updatePost } from "@/lib/Post";
import { PostForm } from "../../components/PostForm";
import { useSupabase } from "@/app/providers/supabase-provider";

export default function EditForm({ post }: { post: Post }) {
  const { session } = useSupabase();
  const router = useRouter();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    post: Post
  ) => {
    e.preventDefault();
    const token = session?.access_token ?? "";
    await updatePost(post, token);
    router.push("/posts");
    startTransition(() => router.refresh());
  };

  return <PostForm handleSubmit={handleSubmit} post={post} />;
}
