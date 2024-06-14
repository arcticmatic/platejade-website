import SocialMedia from '../../../../models/socialMedia';
import { NextResponse } from "next/server";
import connect from "../../../../utils/db";

export default async function handler(req, { params }) {
  const { id } = params;

  try {
    await connect();

    const deletedSocialMedia = await SocialMedia.findByIdAndDelete(id);

    if (!deletedSocialMedia) {
      return NextResponse.json({ error: 'SocialMedia not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'SocialMedia deleted successfully' });
  } catch (error) {
    console.error('Error deleting social media:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}