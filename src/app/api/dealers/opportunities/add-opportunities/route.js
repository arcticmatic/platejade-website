
import mongoose from 'mongoose';
import Opportunity from '../../../../models/opportunity'; 
import { NextResponse } from 'next/server';
import connect from "../../../../models/opportunity";


export async function POST(req, res) {
  try {
    const { opportunity } = await req.json();


      await connect();
 
     const newOpportunity = new Opportunity(opportunity);
     await newOpportunity.save();


      return NextResponse.json({ success: true });
    } catch (error) {
    console.error('Error saving OpponewOpportunity:', error);
    return NextResponse.json({ success: false, error: error.message });
    }
  
}