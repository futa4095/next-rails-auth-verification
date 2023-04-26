'use client';

import { useRouter } from "next/navigation";
import { useSupabase } from "../providers/supabase-provider";

export default function AccountDeleteForm() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const handleDeleteUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("/api/users/me", { method: "DELETE" });
    if (!res.ok) {
      throw new Error("User delete failed");
    }
    // await supabase.auth.signOut();
    router.push("/");
  };

  return <button onClick={handleDeleteUser}>アカウントを削除</button>;
}
