import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({

 title: {
    type: String,
  },
  text: {
    type: String,
  },
  appleLink: {
    type:String,
  },
  googleLink: {
    type:String,
  },
   
}, { timestamps: true });


module.exports = mongoose.models.Download || mongoose.model("Download", downloadSchema);
