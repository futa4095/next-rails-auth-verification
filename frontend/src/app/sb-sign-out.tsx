'use client';
import { useRouter } from "next/navigation";
import { useSupabase } from "./providers/supabase-provider";

export default function SbSignOutButton(){
  const { supabase } = useSupabase()
  const router = useRouter();
  const  handleSignOut = () => {
    console.log('sb sign out button');
    supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return <button onClick={handleSignOut}>sbログアウト</button>
}
