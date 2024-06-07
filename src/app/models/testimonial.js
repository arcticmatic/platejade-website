import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  id: {
    type: String,
 } ,
 customerName: {
    type: String,
    },
     customerRole: {
    type: String,
  },
  text: {
    type: String,
  },
  icon: {
    type:String,
  },

   
}, { timestamps: true });


module.exports = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
