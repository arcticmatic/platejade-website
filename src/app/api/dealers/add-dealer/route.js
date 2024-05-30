import mongoose from 'mongoose';
import Dealer from '../../../models/dealer'; // Check if the path to the dealer model is correct
import { NextResponse } from 'next/server';

// Establish a connection to the MongoDB database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

export async function POST(req) {
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