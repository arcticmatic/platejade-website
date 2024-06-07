import mongoose from 'mongoose';

const dealerSchema = new mongoose.Schema({
  dealerShipName: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  selectedPlan: { type:String },
  contactPerson: { type:String },
  phone: { type:String },
  fileUrl: { type:String },
}, { timestamps: true });


module.exports = mongoose.models.Dealer || mongoose.model("Dealer", dealerSchema);
