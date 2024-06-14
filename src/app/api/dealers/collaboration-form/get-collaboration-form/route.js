import connect from "../../../../utils/db";
import dealersCollaborationForm from "../../../../models/dealersCollaborationForm";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const collaborationForm = await dealersCollaborationForm.find();


    return NextResponse.json(
   
     { success: true, data: collaborationForm },
    );
  } catch (error) {
    console.error("Error fetching advantages block", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}

export const dynamic = "force-dynamic";
