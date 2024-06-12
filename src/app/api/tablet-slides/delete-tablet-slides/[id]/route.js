import  TabletSlide from '../../../../models/tabletSlide'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';


export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedTabletSlide = await TabletSlide.findByIdAndDelete(id);

      if (!deletedTabletSlide) {
        return NextResponse.json({ error: 'TabletSlide is not found' });
      }

      return NextResponse.json({ message: ' TabletSlide is deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }
