import connect from "../../../utils/db";
import VideoBlock from "../../../models/videoBlock";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const videoBlocks = await VideoBlock.find();

    return NextResponse.json(
   
     { success: true, data: videoBlocks },
    );
  } catch (error) {
    console.error("Error fetching video blocks:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}

export const dynamic = "force-dynamic";
