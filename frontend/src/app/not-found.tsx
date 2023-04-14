import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p>お探しのページは見つかりません</p>
      <Link href="/">トップページへ</Link>
    </div>
  )
}
