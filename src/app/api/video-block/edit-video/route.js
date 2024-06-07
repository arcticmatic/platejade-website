import connect from "../../../../utils/db";
import VideoBlock from "../../../../models/videoBlock";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  await connect();

  try {
    const { id, title, text, subText, videoSrc } = await req.json();

    const updatedVideoBlock = await VideoBlock.findByIdAndUpdate(
      id,
      { title, text, subText, videoSrc },
      { new: true }
    );

    if (!updatedVideoBlock) {
      return NextResponse.json({
        status: 404,
        body: { success: false, error: "Video block not found" },
      });
    }

    return NextResponse.json({
      status: 200,
      body: { success: true, data: updatedVideoBlock },
    });
  } catch (error) {
    console.error("Error updating video block:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}