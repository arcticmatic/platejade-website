import HowItWorksDealer from '../../../../../models/howItWorksDealer';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { workItem } = await req.json();

  try {
    const updatedWorkItem = await HowItWorksDealer.findByIdAndUpdate(id, workItem, { new: true });

    if (!updatedWorkItem) {
      return NextResponse.json({ error: 'Work item not found' });
    }

    return NextResponse.json({ message: 'Work item updated successfully', workItem: updatedWorkItem });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}