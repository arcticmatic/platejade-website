
import mongoose from 'mongoose';
import DealersCollaborationForm from '../../../../models/dealersCollaborationForm'; 
import { NextResponse } from 'next/server';
import connect from "../../../../utils/db";


export async function POST(req, res) {
  try {
          const { field  } = await req.json();

      await connect();

    
    const newDealerCollaborationForm = new DealersCollaborationForm(field);
        await newDealerCollaborationForm.save();
      

      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving faqs:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}