import SlidesText from '../../../../models/slidesText'
import { NextResponse } from 'next/server';

export async function PATCH(req,{params}) {
  const { id } = params;
    const { slidesText } = await req.json();
  
  try {
    const updatedSlidesText = await SlidesText.findByIdAndUpdate(id,  slidesText, { new: true });

    if (!updatedSlidesText) {
      return NextResponse.json({ error: 'SlideText not found' });
    }

    return NextResponse.json({ message: 'SlideText updated successfully',slidesText: updatedSlidesText });
  } catch (error) {
    console.error('Error updating SlidesText:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}