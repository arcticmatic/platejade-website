import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema({
  
  
}, { timestamps: true, strict:false });

module.exports = mongoose.models.Letter || mongoose.model("Letter", letterSchema);