import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 
 
  email: {
    type: String,
    },
     password: {
    type: String,
  },
  role: {
       type: String,
     }

}, { timestamps: true });


module.exports = mongoose.models.User || mongoose.model("User", userSchema);
