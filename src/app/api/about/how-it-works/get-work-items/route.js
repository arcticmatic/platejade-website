import connect from "../../../../utils/db";
import HowItWork from "../../../../models/howItWork";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const howItWorks = await HowItWork.find();

    return NextResponse.json(
   
     { success: true, data: howItWorks },
    );
  } catch (error) {
    console.error("Error fetching how it works blocks:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}