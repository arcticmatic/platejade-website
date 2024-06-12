import connect from "../../../utils/db";
import SocialMedia from "../../../models/socialMedia";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const socialMedia = await SocialMedia.find();

    return NextResponse.json(
   
     { success: true, data: socialMedia },
    );
  } catch (error) {
    console.error("Error fetching advantages block", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}