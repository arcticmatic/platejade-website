import connect from "../../../../utils/db";
import RightFeatures from "../../../../models/rightFeatures";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const rightFeatures = await RightFeatures.find();

    return NextResponse.json(
   
     { success: true, data: rightFeatures },
    );
  } catch (error) {
    console.error("Error fetching right features:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}