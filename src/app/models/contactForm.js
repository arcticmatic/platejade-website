import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema({

     id:{type:String},
      name: { type: String},
      value: { type: String },
      placeholder: {type:String},
    
  
   
}, { timestamps: true });


module.exports = mongoose.models.ContactForm || mongoose.model("ContactForm", contactFormSchema);
