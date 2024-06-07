import mongoose from 'mongoose';

const aboutSlideSchema = new mongoose.Schema({
  id:{    type: String,
 } ,
 title: {
    type: String,
  },
  text: {
    type: String,
  },
   imageSrc: {
    type: String,
  },
   backgroundSrc: {
    type: String,
  },
   
}, { timestamps: true });


module.exports = mongoose.models.AboutSlide || mongoose.model("AboutSlide", aboutSlideSchema);
