'use client';
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation";

export default function SignOutButton(){
  const router = useRouter();
  const  handleSignOut = () => {
    console.log('sign out button');
    auth().signOut();
    router.push("/");
    router.refresh();
  };

  return <button onClick={handleSignOut}>ログアウト</button>
}
