"use client";

import { useSupabase } from "@/app/providers/supabase-provider";
import { Post, deletePost } from "@/lib/Post";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function DeleteButton({ post }: { post: Post }) {
  const { session } = useSupabase();
  const router = useRouter();
  const handleDelete = async () => {
    const token = session?.access_token ?? "";
    await deletePost(post, token);
    router.push("/posts");
    startTransition(() => router.refresh());
  };

  return <button onClick={handleDelete}>delete</button>;
}
