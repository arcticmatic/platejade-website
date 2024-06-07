
import mongoose from 'mongoose';
import Faq from '../../../../models/faq'; 
import { NextResponse } from 'next/server';
import connect from "../../../../utils/db";


export async function POST(req, res) {
  try {
          const { faq } = await req.json();

      await connect();


    
        const newFaq= new Faq(faq);
        await newFaq.save();
      

      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving faqs:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}