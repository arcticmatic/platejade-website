import connect from "../../../utils/db";
import SlidesText from "../../../models/slidesText";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const slide = await SlidesText.find();

    return NextResponse.json(
   
     { success: true, data: slide },
    );
  } catch (error) {
    console.error("Error fetching advantages block", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}