import  DealersCollaborationForm from '../../../../../models/dealersCollaborationForm'; 
import { NextRequest, NextResponse } from "next/server"
import connect from "../../../../../utils/db";
import mongoose from 'mongoose';


export async function DELETE(req, {params}) {

  const { id } = params;

    try {
     
      const deletedDealersCollaborationForm = await DealersCollaborationForm.findByIdAndDelete(id);

      if (!deletedDealersCollaborationForm) {
        return NextResponse.json({ error: 'dealersCollaborationForm is not found' });
      }

      return NextResponse.json({ message: ' dealersCollaborationForm is deleted successfully' });
    } catch (error) {
      console.error('Error deleting slide:', error);
      return NextResponse.json({ error: 'Internal server error' });
    }
  }