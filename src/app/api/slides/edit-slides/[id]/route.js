import Slide from '../../../../models/slide'
import { NextResponse } from 'next/server';

export async function PATCH(req,{params}) {
  const { id } = params;
    const { mobileSlide } = await req.json();
  
  try {
    const updatedMobileSlide = await Slide.findByIdAndUpdate(id,  mobileSlide, { new: true });

    if (!updatedMobileSlide) {
      return NextResponse.json({ error: 'MobileSlide not found' });
    }

    return NextResponse.json({ message: 'MobileSlide updated successfully',mobileSlide: updatedMobileSlide });
  } catch (error) {
    console.error('Error updating MobileSlide:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}