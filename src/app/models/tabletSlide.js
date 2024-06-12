import mongoose from 'mongoose';


const tabletSlideSchema = new mongoose.Schema({
      id: {
    type: String,
    },
    icons: {
    type: Array,
    },
     page: {
    type: String,
}
}, { timestamps: true });

module.exports = mongoose.models.tabletSlide || mongoose.model("tabletSlide", tabletSlideSchema);