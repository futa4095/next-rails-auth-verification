'use client';

import { auth } from "@/lib/firebase";
import SignOutButton from "./sign-out-button";

export default function SignInStatus() {
  return (
    <>
      {auth().currentUser ?
        <>
          <div>ログイン中</div>
          <SignOutButton />
        </>
        :
        <div>ログインしていません</div>
      }
    </>
  )
}
