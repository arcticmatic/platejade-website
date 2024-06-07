import AboutSlide from '../../../../models/aboutSlide'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';



export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedSlide = await AboutSlide.findByIdAndDelete(id);

      if (!deletedSlide) {
        return NextResponse.json({ error: 'Slide not found' });
      }

      return NextResponse.json({ message: 'Slide deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }
