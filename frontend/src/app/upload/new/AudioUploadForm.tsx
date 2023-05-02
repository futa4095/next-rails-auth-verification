"use client";

import { useState } from "react";

export default function AudioUploadForm() {
  const [audio, setAudio] = useState<File | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const onChangeAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setAudio(selectedFile);

    if (!selectedFile) {
      setAudioPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAudioPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("upload ...");
    if (audio) {
      console.log(audio.name);
      const params = new URLSearchParams({ key: "audio.mp3" });

      const { signedUrl } = await (
        await fetch("/api/signedUrl?" + params)
      ).json();
      const res = await fetch(signedUrl, {
        method: "PUT",
        body: audio,
        headers: {
          "Content-Type": audio.type,
        },
      });
      if (res.ok) {
        console.log(res.text);
      } else {
        console.error(res.statusText);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="audio"
          placeholder="audio"
          accept="audio/mpeg"
          onChange={onChangeAudio}
        />
        <button type="submit">アップロード</button>
      </form>
      {audioPreviewUrl && (
        <audio controls controlsList="nodownload">
          <source src={audioPreviewUrl} />
        </audio>
      )}
    </div>
  );
}
