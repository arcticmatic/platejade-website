
import mongoose from 'mongoose';
import SocialMedia from '../../../models/socialMedia'; 
import { NextResponse } from 'next/server';
import connect from "../../../utils/db";


export async function POST(req, res) {
  try {
          const { socialMedia } = await req.json();

      await connect();


    
        const newSocialMedia = new SocialMedia(socialMedia);
        await newSocialMedia.save();
      

      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving faqs:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}