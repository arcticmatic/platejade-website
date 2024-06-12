
import mongoose from 'mongoose';
import SlidesText from '../../../models/slidesText'; 
import { NextResponse } from 'next/server';
import connect from "../../../utils/db";


export async function POST(req, res) {
  try {
          const { slideText } = await req.json();

      await connect();


    
        const newSlideText = new SlidesText(slideText);
        await newSlideText.save();
      

      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving faqs:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}