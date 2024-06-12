import mongoose from 'mongoose';

const slidesTextchema = new mongoose.Schema({
 id: {
    type: String,
  },
 title: {
    type: Array,
  },
  text: {
    type: Array,
  },

 page: {
    type: String,
  },
   
}, { timestamps: true });


module.exports = mongoose.models.SlidesText || mongoose.model("SlidesText", slidesTextchema);
