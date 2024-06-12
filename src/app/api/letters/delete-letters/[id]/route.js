import  Letter from '../../../../models/letter'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';


export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedLetter = await Letter.findByIdAndDelete(id);

      if (!deletedLetter) {
        return NextResponse.json({ error: 'Letter is not found' });
      }

      return NextResponse.json({ message: ' Letter is deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }
