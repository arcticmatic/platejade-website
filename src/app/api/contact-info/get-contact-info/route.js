import connect from "../../../../utils/db";
import Contact from "../../../../models/contact";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const contact = await Contact.find();

    return NextResponse.json(
   
     { success: true, data: contact },
    );
  } catch (error) {
    console.error("Error fetching contacts info block", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}