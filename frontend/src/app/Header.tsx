import Link from 'next/link'
import SignInStatus from './sign-in-status'
import SbSignOutButton from './sb-sign-out'

export default function Header() {
  return (
    <>
      <ul>
        <li>
          <Link href="/">Top</Link>
        </li>
        <li>
          <Link href="/posts">posts</Link>
        </li>
        <li>
          <Link href="/posts/new">new posts</Link>
        </li>
      </ul>
      <SignInStatus />
      <SbSignOutButton />
    </>
  )
}
