import  DesktopSlide from '../../../../models/desktopSlide'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';


export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedDesktopSlide = await DesktopSlide.findByIdAndDelete(id);

      if (!deletedDesktopSlide) {
        return NextResponse.json({ error: 'DesktopSlide is not found' });
      }

      return NextResponse.json({ message: ' DesktopSlide is deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }
