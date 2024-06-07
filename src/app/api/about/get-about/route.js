import connect from "../../../../utils/db";
import AboutSlide from "../../../../models/aboutSlide";
import { NextResponse } from 'next/server';

export  async function GET() {
    try {
      await connect();

      const slides = await AboutSlide.find();

      return NextResponse.json({ success: true, slides });
    } catch (error) {
      console.error("Error fetching slides:", error);
      return NextResponse.json({ success: false, error: error.message }, 500);
    }
  
}