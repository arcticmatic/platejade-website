import mongoose from 'mongoose';

const socialMediachema = new mongoose.Schema({
 iconHome: {
    type: String,
  },
  iconContacts: {
    type: String,
  },
 link: {
    type: String,
  },
 
   
}, { timestamps: true });


module.exports = mongoose.models.SocialMedia || mongoose.model("SocialMedia", socialMediachema);
