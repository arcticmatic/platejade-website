import  SocialMedia from '../../../../models/socialMedia'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';


export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedSocialMedia = await SocialMedia.findByIdAndDelete(id);

      if (!deletedSocialMedia) {
        return NextResponse.json({ error: 'SocialMedia is not found' });
      }

      return NextResponse.json({ message: ' SocialMedia is deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }
