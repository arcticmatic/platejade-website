import connect from "../../../../utils/db";
import LeftFeatures from "../../../../models/leftFeatures";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const leftFeatures = await LeftFeatures.find();

    return NextResponse.json(
   
     { success: true, data: leftFeatures },
    );
  } catch (error) {
    console.error("Error fetching how it works blocks:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}