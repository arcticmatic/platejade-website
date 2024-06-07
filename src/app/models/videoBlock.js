import mongoose from 'mongoose';

const videoBlockSchema = new mongoose.Schema({

 title: {
    type: String,
  },
  text: {
    type: String,
  },
  subText: {
    type:String,
  },
   videoSrc: {
    type: String,
  },
   page: {
    type: String,
  },
   
}, { timestamps: true });


module.exports = mongoose.models.VideoBlock || mongoose.model("VideoBlock", videoBlockSchema);
