import { notFound } from "next/navigation";

export type Post = {
  id?: number;
  title: string;
  body: string;
};

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/posts", { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/api/posts/${id}`, { cache: 'no-store' });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

export async function createPost(post: Post): Promise<void> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }
}

export async function updatePost(post: Post) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/api/posts/${post.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: post.title, body: post.body }),
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }
}
export async function deletePost(post: Post) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/api/posts/${post.id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
}
