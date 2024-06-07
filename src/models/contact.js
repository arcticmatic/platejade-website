import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema({
  mediaName: { type: String },
  mediaId:{ type:String},
  icon: { type: String },
  link: { type: String },
});


const contactSchema = new mongoose.Schema({

 phone: {
    type: String,
  },
  email: {
    type: String,
  },
  location: {
    type:String,
  },
  socialMedia: 
  [socialMediaSchema],

   
}, { timestamps: true });


module.exports = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
