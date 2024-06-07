import RightFeatures from '../../../../models/rightFeatures';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { feature } = await req.json();

  try {
    const updatedRightFeature = await RightFeatures.findByIdAndUpdate(id, feature, { new: true });

    if (!updatedRightFeature) {
      return NextResponse.json({ error: 'Feature not found' });
    }

    return NextResponse.json({ message: 'Feature is updated successfully', feature: updatedRightFeature });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}