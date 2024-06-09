import mongoose from 'mongoose';



const dealerSlideSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: Array,
  },
  slides: {
    type: Array,
  },
  tabletSlidesArray: {
    type: Array,
  },
  desktopSlidesArray: {
    type: Array,
  },
}, { timestamps: true });

module.exports = mongoose.models.DealerSlide || mongoose.model("DealerSlide", dealerSlideSchema);