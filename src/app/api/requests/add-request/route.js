import mongoose from 'mongoose';
import CollaborationRequest from '../../../models/collaborationRequest'; 
import { NextResponse } from 'next/server';
import connect from "../../../utils/db";


export async function POST(req) {

  await connect();
  
  try {
    const request = await req.json();

    const collaborationRequest = new CollaborationRequest(request, false);
      
    await collaborationRequest.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving collaborationRequest:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}