import mongoose from 'mongoose';

const faqsDealerSchema = new mongoose.Schema({
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


module.exports = mongoose.models.FaqsDealer || mongoose.model("FaqsDealer", faqsDealerSchema);
