import mongoose from 'mongoose';
import Letter from '../../../models/letter';
import { NextResponse } from 'next/server';
import connect from "../../../utils/db";


export async function POST(req) {
    await connect();

  try {
    const  formData  = await req.json();


    const letter = new Letter(formData, false);
      
    await letter.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving letter:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}