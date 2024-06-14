import connect from "../../../utils/db";
import  DealersCollaborationForm from "../../../models/dealersCollaborationForm";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const  dealersCollaborationFormForm = await  DealersCollaborationForm.find();

    return NextResponse.json(
   
     { success: true, data:  dealersCollaborationFormForm },
    );
  } catch (error) {
    console.error("Error fetching  DealersCollaborationFormForms block", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}
export const dynamic = "force-dynamic";
