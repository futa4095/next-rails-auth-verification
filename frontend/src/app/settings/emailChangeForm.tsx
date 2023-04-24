"use client";

import { useState } from "react";
import { useSupabase } from "../providers/supabase-provider";

export default function EmailChangeForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const {supabase} = useSupabase()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {error} = await supabase.auth.updateUser({email})
    error ? setMessage(error.message) : setMessage('')
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="mail"
        placeholder="new email address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button type="submit">メールアドレスを変更</button>
      <p>{message}</p>
    </form>
  );
}
