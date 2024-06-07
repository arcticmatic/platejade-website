import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({

 title: {
    type: String,
  },
  text: {
    type: String,
  },


   
}, { timestamps: true });


module.exports = mongoose.models.Faq || mongoose.model("Faq", faqSchema);
