'use client'

import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useSupabase } from "../providers/supabase-provider";

export default function SignUpForm() {
  const { supabase, session } = useSupabase();
  const [email, setEmail] = useState("alice@example.com")
  const [password, setPassword] = useState("testpassword")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userCredential = await createUserWithEmailAndPassword(auth(), email, password);
    const user = userCredential.user;
    console.log(user);
  }
  console.log(session);
  const handleSubmitsb = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await supabase.auth.signUp({email, password});
    console.log(`sb sign up ${data}`)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input name="email" title="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">email</label>
        <input name="password" title="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">fb登録</button>
      </form>
      <form onSubmit={handleSubmitsb}>
        <label htmlFor="email">email</label>
        <input name="email" title="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">email</label>
        <input name="password" title="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">sb登録</button>
      </form>
    </>
  );
}
