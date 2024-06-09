import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
 id: {
    type: String,
  },
 title: {
    type: String,
  },
  text: {
    type: String,
  },


   
}, { timestamps: true });


module.exports = mongoose.models.Faq || mongoose.model("Faq", faqSchema);
