import mongoose from 'mongoose';


const slideSchema = new mongoose.Schema({
    icons: {
    type: Array,
    },
     page: {
    type: String,
}
}, { timestamps: true });

module.exports = mongoose.models.Slide || mongoose.model("Slide", slideSchema);