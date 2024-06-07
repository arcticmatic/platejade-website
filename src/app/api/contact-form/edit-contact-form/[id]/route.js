import ContactForm from '../../../../../models/contactForm';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { contact } = await req.json();

  try {
    const updatedContactForm = await ContactForm.findByIdAndUpdate(id, contact, { new: true });

    if (!updatedContactForm) {
      return NextResponse.json({ error: 'Work item not found' });
    }

    return NextResponse.json({ message: 'Work item updated successfully', newContact: updatedContactForm });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}