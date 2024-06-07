import mongoose from 'mongoose';
import VideoBlock from '../../../../models/videoBlock';
import { NextResponse } from 'next/server';
import connect from "../../../../utils/db";


export async function POST(req) {

  await connect();
  
  try {
    const { title, text, subText, videoSrc } = await req.json();

    console.log("text:", text)

    const videoBlock = new VideoBlock({
        title: title,
      text: text,
        subText: subText,
        videoSrc: videoSrc
    });
      
    await videoBlock.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving video block:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}