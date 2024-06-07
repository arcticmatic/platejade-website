import AboutSlide from '../../../../../models/aboutSlide';
import { NextResponse } from 'next/server';

export async function PATCH(req,{params}) {
  const { id } = params;
            const { slide } = await req.json();
  
  try {
    const updatedSlide = await AboutSlide.findByIdAndUpdate(id, slide, { new: true });

    if (!updatedSlide) {
      return NextResponse.json({ error: 'Slide not found' });
    }

    return NextResponse.json({ message: 'Slide updated successfully', slide: updatedSlide });
  } catch (error) {
    console.error('Error updating slide:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}