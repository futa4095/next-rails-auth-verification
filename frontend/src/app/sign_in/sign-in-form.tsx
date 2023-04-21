'use client'

import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from "next/navigation";
import { useSupabase } from "../providers/supabase-provider";

export default function SignInForm() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [email, setEmail] = useState("alice@example.com")
  const [password, setPassword] = useState("testpassword")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (auth().currentUser) {
      console.log(auth().currentUser);
      console.log('sign out')
      auth().signOut();
    }
    const userCredential = await signInWithEmailAndPassword(auth(), email, password);
    const user = userCredential.user;
    console.log(user);
    const idToken = await auth().currentUser?.getIdToken(true);
    await fetch('/api/login', {
      method: 'POST', headers: {
        'Authorization': `Bearer ${idToken}`,
      }
    });
    router.push("/posts");
    router.refresh();
  }
  const handleSubmitsb = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await supabase.auth.signInWithPassword({
      email,
      password
    })
    console.log(`sb login ${data}`)
    router.push("/posts");
    router.refresh();
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input name="email" title="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">email</label>
        <input name="password" title="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">fbauthを使ってログイン</button>
      </form>
      <form onSubmit={handleSubmitsb}>
        <label htmlFor="email">email</label>
        <input name="email" title="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">email</label>
        <input name="password" title="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">supabaseを使ってログイン</button>
      </form>
    </>
  );
}
