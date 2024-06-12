import connect from "../../../utils/db";
import FormsDescription from "../../../models/formsDescription";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const formsDescription = await FormsDescription.find();

    return NextResponse.json(
   
     { success: true, data: formsDescription },
    );
  } catch (error) {
    console.error("Error fetching video blocks:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}