import mongoose from 'mongoose';
import Letter from '../../../models/letter';
import { NextResponse } from 'next/server';

mongoose.connect(process.env.DB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

export async function POST(req) {
  try {
    const { firstName, lastName, phone, email, message } = await req.json();

    const letter = new Letter({
      firstName: firstName,
      lastName: lastName,
      email:email,
      phone:phone,
     message:message
    });
      
    await letter.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving letter:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}