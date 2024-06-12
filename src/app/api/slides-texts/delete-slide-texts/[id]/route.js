import  SlidesText from '../../../../models/slidesText'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';


export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedSlidesText = await SlidesText.findByIdAndDelete(id);

      if (!deletedSlidesText) {
        return NextResponse.json({ error: 'SlidesText is not found' });
      }

      return NextResponse.json({ message: ' SlidesText is deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }
