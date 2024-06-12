import DesktopSlide from '../../../../models/desktopSlide'
import { NextResponse } from 'next/server';

export async function PATCH(req,{params}) {
  const { id } = params;
    const { desktopSlide } = await req.json();
  
  try {
    const updatedDesktopSlide = await DesktopSlide.findByIdAndUpdate(id,  desktopSlide, { new: true });

    if (!updatedDesktopSlide) {
      return NextResponse.json({ error: 'desktopSlide not found' });
    }

    return NextResponse.json({ message: 'desktopSlide updated successfully',desktopSlide: updatedDesktopSlide });
  } catch (error) {
    console.error('Error updating desktopSlide:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}