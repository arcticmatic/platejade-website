import  Faq from '../../../../../../models/faq'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../../../utils/db";
import mongoose from 'mongoose';


export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedFaq = await Faq.findByIdAndDelete(id);

      if (!deletedFaq) {
        return NextResponse.json({ error: 'FAQ is not found' });
      }

      return NextResponse.json({ message: ' Faq is deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }
