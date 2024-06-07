import mongoose from 'mongoose';

const howItWorkSchema = new mongoose.Schema({

 title: {
    type: String,
  },
  text: {
    type: String,
  },
  icon: {
    type:String,
  },

   
}, { timestamps: true });


module.exports = mongoose.models.HowItWork || mongoose.model("HowItWork", howItWorkSchema);
