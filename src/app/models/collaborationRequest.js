import mongoose from 'mongoose';

const collaborationRequestSchema = new mongoose.Schema({
    fileUrl:{
     type: String,
 }
}, { timestamps: true,  strict:false });


module.exports = mongoose.models.collaborationRequest || mongoose.model("collaborationRequest", collaborationRequestSchema);
