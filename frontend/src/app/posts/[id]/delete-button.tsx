'use client';

import { Post, deletePost } from "@/lib/Post";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function DeleteButton({ post }: { post: Post }) {
  const router = useRouter();
  const handleDelete = async () => {
    await deletePost(post);
    router.push("/posts")
    startTransition(() => router.refresh())
  }

  return <button onClick={handleDelete}>delete</button>
}
