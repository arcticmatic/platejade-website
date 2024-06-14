import connect from "../../../../utils/db";
import PaymentOption from "../../../../models/paymentOption";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connect();

  try {
    const newPaymentOption = await PaymentOption.find();

    return NextResponse.json(
   
     { success: true, data: newPaymentOption },
    );
  } catch (error) {
    console.error("Error fetching how it works blocks:", error);
    return NextResponse.json({
      status: 500,
      body: { success: false, error: error.message },
    });
  }
}
export const dynamic = "force-dynamic";
