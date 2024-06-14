import connect from "../../../utils/db";
import Download from "../../../models/download";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const download = await Download.find();

    return NextResponse.json(
   
     { success: true, data: download },
    );
  } catch (error) {
    console.error("Error fetching download block", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}

export const dynamic = "force-dynamic";
