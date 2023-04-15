import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p>お探しのページは見つかりません[id]</p>
      <Link href="/">トップページへ</Link>
    </div>
  )
}
