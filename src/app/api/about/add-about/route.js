
import mongoose from 'mongoose';
import AboutSlide from '../../../models/aboutSlide'; 
import { NextResponse } from 'next/server';
import connect from "../../../utils/db";


export async function POST(req, res) {
  try {
          const { slide } = await req.json();

      await connect();


   
        const aboutSlide = new AboutSlide(slide);
        await aboutSlide.save();
  

      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving slides:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}