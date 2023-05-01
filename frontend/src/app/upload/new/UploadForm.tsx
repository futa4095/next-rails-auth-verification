"use client";

import { sign } from "crypto";
import Image from "next/image";
import { useState } from "react";

export default function UploadForm() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setImage(selectedFile);

    if (!selectedFile) {
      setImagePreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };
  const onChangeAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setAudio(files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("upload ...");
    if (image) {
      console.log(image.name);
      const formData = new FormData();
      formData.append("file", image);

      const { signedUrl } = await (await fetch("/api/signedUrl")).json();
      console.info(signedUrl)
      // const url =
      //   "https://next-rails-development.storage.googleapis.com/image/test.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=GOOG1ER4C7WDW35VCIXTANFROTY4RTWSIGQIF6IQYZZDM3P7ZROPA5LMMB4XI%2F20230430%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20230430T093809Z&X-Amz-Expires=600&X-Amz-Signature=0c685902df84b256cfe6cd6de0c541fc9ec41a766de422434f7206e69ec5cb8a&X-Amz-SignedHeaders=host&x-id=PutObject";
      const res = await fetch(signedUrl, {
        method: "PUT",
        body: image,
        headers: {
          "Content-Type": image.type,
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
          name="image"
          placeholder="image"
          accept="image/jpeg, image/png"
          onChange={onChangeImage}
        />
        <input
          type="file"
          name="audio"
          placeholder="audio"
          accept="audio/mpeg"
          onChange={onChangeAudio}
        />
        <button type="submit">アップロード</button>
      </form>
      {
        // eslint-disable-next-line @next/next/no-img-element
        imagePreviewUrl && <img src={imagePreviewUrl} alt="preview" />
      }
    </div>
  );
}
