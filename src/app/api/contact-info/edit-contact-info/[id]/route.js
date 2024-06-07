import Contact from '../../../../../models/contact';
import { NextResponse } from 'next/server';

export async function PATCH(req,{params}) {
  const { id } = params;
    const { contact } = await req.json();
    
   
  try {
    const updateFields = {
      email: contact.email,
      location: contact.location,
      phone: contact.phone,
    };

      for (const socialItem of contact.socialMedia) {
          console.log("social item:", socialItem)
      
      await Contact.updateOne(
        { _id: id, 'contact.$socialMedia.mediaId': socialItem.mediaId },
        {
         
            socialMedia: socialItem,
       
        }
      );
    }

    // Retrieve the updated document
    const finalUpdatedContact = await Contact.findById(id);

    return NextResponse.json({ message: 'Contact updated successfully', finalUpdatedContact });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}