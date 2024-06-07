import mongoose from 'mongoose';
import Dealer from '../../../models/dealer'; // Check if the path to the dealer model is correct
import { NextResponse } from 'next/server';
import connect from "../../../utils/db";


export async function POST(req) {

  await connect();
  
  try {
    const { dealerShipName, address, selectedPlan, email, contactPerson, phone, fileUrl } = await req.json();

    const dealer = new Dealer({
      dealerShipName: dealerShipName,
      address:address,
      email:email,
      selectedPlan: selectedPlan,
      contactPerson:contactPerson,
      phone:phone,
      fileUrl: fileUrl
    });
      
    await dealer.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving dealer:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}