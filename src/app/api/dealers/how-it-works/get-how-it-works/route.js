import connect from "../../../../../utils/db";
import HowItWorksDealer from "../../../../../models/howItWorksDealer";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const howItWorksDealer = await HowItWorksDealer.find();

    return NextResponse.json(
   
     { success: true, data: howItWorksDealer },
    );
  } catch (error) {
    console.error("Error fetching how it works blocks:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}