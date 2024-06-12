
import mongoose from 'mongoose';
import ContactForm from '../../../models/contactForm'; 
import { NextResponse } from 'next/server';
import connect from "../../../utils/db";


export async function POST(req, res) {
  try {
          const { field  } = await req.json();

      await connect();

    
    const newContactForm = new ContactForm(field);
        await newContactForm.save();
      

      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving faqs:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}