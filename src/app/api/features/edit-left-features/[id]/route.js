import LeftFeatures from '../../../../../models/leftFeatures';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { feature } = await req.json();

  try {
    const updatedLeftFeature = await LeftFeatures.findByIdAndUpdate(id, feature, { new: true });

    if (!updatedLeftFeature) {
      return NextResponse.json({ error: 'Work item not found' });
    }

    return NextResponse.json({ message: 'Work item updated successfully', feature: updatedLeftFeature });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}