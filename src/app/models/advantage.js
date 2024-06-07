import mongoose from 'mongoose';

const advantageSchema = new mongoose.Schema({

 title: {
    type: String,
  },
  text: {
    type: String,
  },
  mainTitle: {
    type:String,
  },

   
}, { timestamps: true });


module.exports = mongoose.models.Advantage || mongoose.model("Advantage", advantageSchema);
