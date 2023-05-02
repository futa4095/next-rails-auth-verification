import Image from "next/image";

export default async function UploadViewPage() {
  const res = await fetch("http://localhost:3333/api/signedUrl");
  const { signedUrlRead } = await res.json();

  return (
    <>
      <div>{signedUrlRead}</div>;
      <Image src={signedUrlRead} alt="upload file" width="400" height="400" />
    </>
  );
}
