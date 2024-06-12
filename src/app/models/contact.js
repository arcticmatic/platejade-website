import mongoose from 'mongoose';



const contactSchema = new mongoose.Schema({
  id: {
  type:String
},
  details: {
   type:String,
  },
  href: {
    type:String,
  },
 
  type: {
   type:String,
 }
}, { timestamps: true });


module.exports = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
