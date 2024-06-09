import mongoose from 'mongoose';


const slideSchema = new mongoose.Schema({
    icons: {
    type: Array,
}
}, { timestamps: true });

module.exports = mongoose.models.Slide || mongoose.model("Slide", slideSchema);