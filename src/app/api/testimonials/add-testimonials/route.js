
import mongoose from 'mongoose';
import Testimonial from '../../../../models/testimonial'; 
import { NextResponse } from 'next/server';
import connect from "../../../../utils/db";


export async function POST(req, res) {
  try {
    const { testimonial } = await req.json();


      await connect();
 
     const newTestimonial = new Testimonial(testimonial);
     await newTestimonial.save();


      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving testimonials:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}