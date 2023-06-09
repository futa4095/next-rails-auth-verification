import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const Key = searchParams.get('key') ?? 'missing'

  const client = new S3Client({
    region: "auto",
    endpoint: "https://storage.googleapis.com",
    credentials: {
      accessKeyId: process.env.S3CLIENT_ACCESS_KEY ?? "",
      secretAccessKey: process.env.S3CLIENT_SECRET_KEY ?? "",
    },
  });
  const Bucket = `${process.env.BUCKET ?? ""}-${process.env.NODE_ENV}`;
  const command = new PutObjectCommand({ Bucket, Key });
  const signedUrl = await getSignedUrl(client, command, { expiresIn: 600 });

  const getCommand = new GetObjectCommand({ Bucket, Key });
  const signedUrlRead = await getSignedUrl(client, getCommand, { expiresIn: 600 });
  return NextResponse.json({ signedUrl, signedUrlRead });
}
