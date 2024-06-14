import SocialMedia from '../../../../models/socialMedia';
import { NextResponse } from "next/server"
import connect from "../../../../utils/db";
import mongoose from 'mongoose';

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid SocialMedia id' }, { status: 400 });
  }

  try {
    await connect();

    const deletedSocialMedia = await SocialMedia.findByIdAndDelete(id);

    if (!deletedSocialMedia) {
      return NextResponse.json({ error: 'SocialMedia not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'SocialMedia deleted successfully' });
  } catch (error) {
    console.error('Error deleting SocialMedia:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}