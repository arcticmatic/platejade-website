
import mongoose from 'mongoose';
import TabletSlide from '../../../models/tabletSlide'; 
import { NextResponse } from 'next/server';
import connect from "../../../utils/db";


export async function POST(req, res) {
  try {
          const { tabletSlide } = await req.json();

      await connect();


    
        const newTabletSlide = new TabletSlide(tabletSlide);
        await newTabletSlide.save();
      

      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving faqs:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}