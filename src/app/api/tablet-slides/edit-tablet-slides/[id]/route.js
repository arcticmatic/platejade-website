import TabletSlide from '../../../../models/tabletSlide'
import { NextResponse } from 'next/server';

export async function PATCH(req,{params}) {
  const { id } = params;
    const { tabletSlide } = await req.json();
  
  try {
    const updatedTabletSlide = await TabletSlide.findByIdAndUpdate(id,  tabletSlide, { new: true });

    if (!updatedTabletSlide) {
      return NextResponse.json({ error: 'tabletSlide not found' });
    }

    return NextResponse.json({ message: 'tabletSlide updated successfully',tabletSlide: updatedTabletSlide });
  } catch (error) {
    console.error('Error updating tabletSlide:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}