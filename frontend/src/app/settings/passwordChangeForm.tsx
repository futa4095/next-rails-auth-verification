"use client";

import { useState } from "react";
import { useSupabase } from "../providers/supabase-provider";

export default function PasswordChangeForm() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const {supabase} = useSupabase()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {error} = await supabase.auth.updateUser({password})
    error ? setMessage(error.message) : setMessage('')
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="mail"
        placeholder="new password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">パスワードを変更</button>
      <p>{message}</p>
    </form>
  );
}
