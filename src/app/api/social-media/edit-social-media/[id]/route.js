import SocialMedia from '../../../../models/socialMedia'
import { NextResponse } from 'next/server';

export async function PATCH(req,{params}) {
  const { id } = params;
    const { socialMedia } = await req.json();
  
  try {
    const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(id,  socialMedia, { new: true });

    if (!updatedSocialMedia) {
      return NextResponse.json({ error: 'SlideText not found' });
    }

    return NextResponse.json({ message: 'SlideText updated successfully',socialMedia: updatedSocialMedia });
  } catch (error) {
    console.error('Error updating SocialMedia:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}