import Image from "next/image";

export default async function UploadViewPage() {
  const res = await fetch("http://localhost:3333/api/signedUrl");
  const { signedUrlRead } = await res.json();
  const url = new URL("http://localhost:3333/api/signedUrl")
  url.search = new URLSearchParams({key : 'audio.mp3'}).toString()
  console.log(url.toString())
  const resAudio = await fetch(url.toString());
  const resAudio2 = await resAudio.json();
  console.log(resAudio2.signedUrlRead)

  return (
    <>
      <div>{signedUrlRead}</div>
      <Image src={signedUrlRead} alt="upload file" width="400" height="400" />
      <div>{resAudio2.signedUrlRead}</div>
      <audio controls controlsList="nodownload"><source src={resAudio2.signedUrlRead}/></audio>
    </>
  );
}
