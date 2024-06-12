import PaymentOption from '../../../../../models/paymentOption';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { paymentOption } = await req.json();

  try {
    const updatedPaymentOption = await PaymentOption.findByIdAndUpdate(id, paymentOption, { new: true });

    if (!updatedPaymentOption) {
      return NextResponse.json({ error: 'Work item not found' });
    }

    return NextResponse.json({ message: 'Work item updated successfully', paymentOption: updatedPaymentOption });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}