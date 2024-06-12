import Contact from '../../../../models/contact';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { contact} = await req.json();

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, contact, { new: true });

    if (!updatedContact) {
      return NextResponse.json({ error: 'Work item not found' });
    }

    return NextResponse.json({ message: 'Work item updated successfully', contact: updatedContact });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}