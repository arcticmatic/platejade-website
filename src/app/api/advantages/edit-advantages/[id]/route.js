import Advantage from '../../../../models/advantage';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { advantage} = await req.json();

  try {
    const updatedAdvantage = await Advantage.findByIdAndUpdate(id, advantage, { new: true });

    if (!updatedAdvantage) {
      return NextResponse.json({ error: 'Work item not found' });
    }

    return NextResponse.json({ message: 'Work item updated successfully', advantage: updatedAdvantage });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}