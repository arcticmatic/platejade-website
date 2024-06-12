import DealersCollaborationForm from '../../../../../models/dealersCollaborationForm';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { contact } = await req.json();

  try {
    const updatedDealerCollaborationForm = await DealersCollaborationForm.findByIdAndUpdate(id, contact, { new: true });

    if (!updatedDealerCollaborationForm) {
      return NextResponse.json({ error: 'Work item not found' });
    }

    return NextResponse.json({ message: 'Work item updated successfully', newCollaborationForm: updatedDealerCollaborationForm });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}