'use client'

import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SignUpForm() {
  const [email, setEmail] = useState("alice@example.com")
  const [password, setPassword] = useState("testpassword")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <input name="email" title="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">email</label>
      <input name="password" title="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">登録</button>
    </form>
  );
}
