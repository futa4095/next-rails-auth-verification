import { notFound } from "next/navigation"

export default function Hello({ name }: { name: string }) {
  // notFound()
  // throw new Error('helllo error')
  return (
    <p>Hello, {name}</p>
  )
}
