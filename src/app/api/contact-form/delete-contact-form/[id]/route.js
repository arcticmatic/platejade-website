import  ContactForm from '../../../../models/contactForm'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';


export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedContactForm = await ContactForm.findByIdAndDelete(id);

      if (!deletedContactForm) {
        return NextResponse.json({ error: 'ContactForm is not found' });
      }

      return NextResponse.json({ message: ' ContactForm is deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }
