import Opportunity from '../../../../../models/opportunity';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { opportunity } = await req.json();

  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(id, opportunity, { new: true });

    if (!updatedOpportunity) {
      return NextResponse.json({ error: 'Work item not found' });
    }

    return NextResponse.json({ message: 'Work item updated successfully', opportunity: updatedOpportunity });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}