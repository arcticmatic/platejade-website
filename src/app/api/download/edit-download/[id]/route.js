import Download from '../../../../../models/download';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
   const { id } = params;
  const { item} = await req.json();

  try {
    const updatedDownloadItem = await Download.findByIdAndUpdate(id, item, { new: true });

    if (!updatedDownloadItem) {
      return NextResponse.json({ error: 'Work item not found' });
    }

    return NextResponse.json({ message: 'Work item updated successfully', download: updatedDownloadItem });
  } catch (error) {
    console.error('Error updating work item:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}