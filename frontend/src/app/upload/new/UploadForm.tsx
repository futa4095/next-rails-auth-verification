"use client";

import { useState } from "react";

export default function UploadForm() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("upload ...");
    if (image) {
      console.log(image.name);
      const params = new URLSearchParams({ key: "image.png" });

      const { signedUrl } = await (
        await fetch("/api/signedUrl?" + params)
      ).json();
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
        <button type="submit">アップロード</button>
      </form>
      {
        // eslint-disable-next-line @next/next/no-img-element
        imagePreviewUrl && <img src={imagePreviewUrl} alt="preview" />
      }
    </div>
  );
}
