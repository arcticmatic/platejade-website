import mongoose from 'mongoose';


const desktopSlideSchema = new mongoose.Schema({
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

module.exports = mongoose.models.DesktopSlide || mongoose.model("DesktopSlide", desktopSlideSchema);