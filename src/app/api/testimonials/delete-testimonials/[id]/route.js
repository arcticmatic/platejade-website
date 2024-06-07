import  Testimonial from '../../../../models/testimonial'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';


export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

      if (!deletedTestimonial) {
        return NextResponse.json({ error: 'Testimonial not found' });
      }

      return NextResponse.json({ message: 'Testimonial  deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }
