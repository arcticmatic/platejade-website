import connect from "../../../../utils/db";
import Advantage from "../../../../models/advantage";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const advantage = await Advantage.find();

    return NextResponse.json(
   
     { success: true, data: advantage },
    );
  } catch (error) {
    console.error("Error fetching advantages block", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}