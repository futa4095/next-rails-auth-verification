"use client";
import { useRouter } from "next/navigation";
import { useSupabase } from "./providers/supabase-provider";

export default function SbSignOutButton() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const handleSignOut = async () => {
    console.log("sb sign out button");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error.message);
    }
    router.push("/");
    router.refresh();
  };

  return <button onClick={handleSignOut}>sbログアウト</button>;
}
