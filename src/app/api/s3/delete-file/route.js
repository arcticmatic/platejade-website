import aws from 'aws-sdk';
import { NextResponse } from 'next/server';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// API route handler
export async function PATCH(req) {
  // Extract the URL from the request body
  const { url } = await req.json();

  if (!url) {
   NextResponse.json({ error: 'File URL is required' }, { status: 400 });
  }

  const bucketName = process.env.AWS_BUCKET_NAME;
    const key = url.split('/').slice(-1)[0]; 
    
    console.log("key:", key)

  const params = {
    Bucket: `${bucketName}/website-files`,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    return NextResponse.json({ error: 'Error deleting file from S3' }, { status: 500 });
  }
}