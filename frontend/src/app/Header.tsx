import Link from 'next/link'

export default function Header() {
  return (
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
  )
}
