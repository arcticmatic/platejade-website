import mongoose from 'mongoose';

const howItWorksDealerSchema = new mongoose.Schema({

 title: {
    type: String,
  },
  text: {
    type: String,
  },

   
}, { timestamps: true });


module.exports = mongoose.models.HowItWorksDealer || mongoose.model("HowItWorksDealer", howItWorksDealerSchema);
