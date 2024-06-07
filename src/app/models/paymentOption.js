import mongoose from 'mongoose';

const paymentOptionSchema = new mongoose.Schema({

    subscriptionPeriod: {
    type:String,
    },
    description: {
        type: String,
    },

    price: {
          type: String
      },
    pricingPeriod: { type: String},
      profit: {type: String},
      benefitsIcon: {type: String},
      packageBenefits: {type: Array},
    

   
}, { timestamps: true });


module.exports = mongoose.models.PaymentOption || mongoose.model("PaymentOption", paymentOptionSchema);
