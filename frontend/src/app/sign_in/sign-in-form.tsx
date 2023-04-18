'use client'

import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SignInForm() {
  const [email, setEmail] = useState("alice@example.com")
  const [password, setPassword] = useState("testpassword")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (auth.currentUser) {
      console.log(auth.currentUser);
      console.log('sign out')
      auth.signOut();
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <input name="email" title="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">email</label>
      <input name="password" title="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">ログイン</button>
    </form>
  );
}
