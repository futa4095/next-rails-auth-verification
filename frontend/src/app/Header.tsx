import Link from 'next/link'

export default function Header() {
  return (
    <ul>
      <li>aaa
        <Link href="/">Top</Link>
      </li>
      <li>
        <Link href="/posts">posaats</Link>
      </li>
      <li>
        <Link href="/posts/new">new posts</Link>
      </li>
    </ul>
  )
}
