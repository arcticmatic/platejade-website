import connect from "../../../utils/db";
import CollaborationRequest from "../../../models/collaborationRequest";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const collaborationRequest = await CollaborationRequest.find();

    return NextResponse.json(
   
     { success: true, data: collaborationRequest },
    );
  } catch (error) {
    console.error("Error fetching right features:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}