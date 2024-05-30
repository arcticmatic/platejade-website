import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  const body = await req.json();
  const { name, type } = body;

  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `forms-files/${name}`,
    ContentType: type,
    ACL: "public-read",
  });

  try {
    const url = await getSignedUrl(s3Client, putCommand, { expiresIn: 600 });
    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}