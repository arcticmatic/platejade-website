import FormsDescription from '../../../../models/formsDescription';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { description } = await req.json();

  try {
    const updatedFormsDescription = await FormsDescription.findByIdAndUpdate(id, description, { new: true });

    if (!updatedFormsDescription) {
      return NextResponse.json({ error: 'Feature not found' });
    }

    return NextResponse.json({ message: 'Feature is updated successfully', description: updatedFormsDescription });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}