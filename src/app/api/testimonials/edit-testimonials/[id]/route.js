import Testimonial from '../../../../../models/testimonial';
import { NextResponse } from 'next/server';

export async function PATCH(req,{params}) {
  const { id } = params;
    const { testimonial } = await req.json();
  
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id,  testimonial, { new: true });

    if (!updatedTestimonial) {
      return NextResponse.json({ error: 'Slide not found' });
    }

    return NextResponse.json({ message: 'Slide updated successfully', slide: updatedTestimonial });
  } catch (error) {
    console.error('Error updating slide:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}