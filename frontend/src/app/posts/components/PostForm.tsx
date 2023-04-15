'use client';
import { useState } from "react";
import { Post } from "@/lib/Post";

export function PostForm({ handleSubmit, post }: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, post: Post) => Promise<void>;
  post: Post;
}) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  return (
    <form onSubmit={(e) => { handleSubmit(e, { id: post.id, title, body }); }}>
      <input type="text" name="title" placeholder="title" onChange={(e) => setTitle(e.target.value)} value={title} />
      <textarea name="body" placeholder="body" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
      <button type="submit">update</button>
    </form>
  );
}
