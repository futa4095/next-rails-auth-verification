import { notFound } from "next/navigation"

export default function Hello({ name }: { name: string }) {
  return (
    <p>Hello, {name}</p>
  )
}
