import FaqsDealer from '../../../../../models/faqsDealer';
import { NextResponse } from 'next/server';

export async function PATCH(req,{params}) {
  const { id } = params;
    const { faq } = await req.json();
  
  try {
    const updatedFAQ = await FaqsDealer.findByIdAndUpdate(id,  faq, { new: true });

    if (!updatedFAQ) {
      return NextResponse.json({ error: 'faq not found' });
    }

    return NextResponse.json({ message: 'faq updated successfully',faq: updatedFAQ });
  } catch (error) {
    console.error('Error updating faq:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}