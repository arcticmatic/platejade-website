import connect from "../../../../utils/db";
import Testimonial from "../../../../models/testimonial";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const testimonial = await Testimonial.find();

    return NextResponse.json(
   
     { success: true, data: testimonial },
    );
  } catch (error) {
    console.error("Error fetching advantages block", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}