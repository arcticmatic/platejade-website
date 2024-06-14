import Letter from '../../../../models/letter';
import { NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid letter id' }, { status: 400 });
  }

  try {
    await connect();

    const deletedLetter = await Letter.findByIdAndDelete(id);

    if (!deletedLetter) {
      return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Letter deleted successfully' });
  } catch (error) {
    console.error('Error deleting letter:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}