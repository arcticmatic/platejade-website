import mongoose from 'mongoose';

const leftFeaturesShema = new mongoose.Schema({

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


module.exports = mongoose.models.LeftFeatures || mongoose.model("LeftFeatures", leftFeaturesShema);
