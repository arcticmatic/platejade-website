import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
    email: { type: String },
    message:{type: String}
  
}, { timestamps: true });


module.exports = mongoose.models.Letter || mongoose.model("Letter", letterSchema);
