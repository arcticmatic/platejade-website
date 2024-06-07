import connect from "../../../../utils/db";
import ContactForm from "../../../../models/contactForm";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const contactForm = await ContactForm.find();


    return NextResponse.json(
   
     { success: true, data: contactForm },
    );
  } catch (error) {
    console.error("Error fetching advantages block", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}