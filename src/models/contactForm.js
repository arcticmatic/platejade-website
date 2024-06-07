import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema({

 field: {
    type: String,
  },
  placeholder: {
    type: String,
  },


   
}, { timestamps: true });


module.exports = mongoose.models.ContactForm || mongoose.model("ContactForm", contactFormSchema);
