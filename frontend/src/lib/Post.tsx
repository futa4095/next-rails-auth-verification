import { notFound } from "next/navigation";

export type Post = {
  id?: number;
  title: string;
  body: string;
};

export async function getPosts(token: string): Promise<Post[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/posts", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getPost(id: number, token: string): Promise<Post> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/api/posts/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

export async function createPost(post: Post, token: string): Promise<void> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  console.log("create!");
  if (!res.ok) {
    throw new Error("Failed to create post");
  }
}

export async function updatePost(post: Post, token: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/api/posts/${post.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: post.title, body: post.body }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update post");
  }
}
export async function deletePost(post: Post, token: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/api/posts/${post.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
}
