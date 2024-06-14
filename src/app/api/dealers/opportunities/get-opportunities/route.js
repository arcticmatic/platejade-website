import connect from "../../../../utils/db";
import Opportunity from "../../../../models/opportunity";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const newOpportunity = await Opportunity.find();

    return NextResponse.json(
   
     { success: true, data: newOpportunity },
    );
  } catch (error) {
    console.error("Error fetching how it works blocks:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}

export const dynamic = "force-dynamic";
