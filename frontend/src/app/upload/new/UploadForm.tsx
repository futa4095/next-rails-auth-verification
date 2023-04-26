'use client';

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    console.log('upload ...')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" placeholder="image"/>
      <button type="submit">アップロード</button>
    </form>
  );
}
