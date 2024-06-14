import connect from "../../../utils/db";
import Letter from "../../../models/letter";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const letter = await Letter.find();

    return NextResponse.json(
      { success: true, data: letter },
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
      }
    );
  } catch (error) {
    console.error("Error fetching right features:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}

export const dynamic = "force-dynamic";
