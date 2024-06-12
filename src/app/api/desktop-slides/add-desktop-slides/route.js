
import mongoose from 'mongoose';
import DesktopSlide from '../../../models/desktopSlide'; 
import { NextResponse } from 'next/server';
import connect from "../../../utils/db";


export async function POST(req, res) {
  try {
          const { desktopSlide } = await req.json();

      await connect();


    
        const newDesktopSlide = new DesktopSlide(desktopSlide);
        await newDesktopSlide.save();
      

      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving faqs:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}