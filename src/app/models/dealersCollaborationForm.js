import mongoose from 'mongoose';

const dealersCollaborationFormSchema = new mongoose.Schema({

     id:{type:String},
      name: { type: String},
      value: { type: String },
      placeholder: {type:String},
      page: {
          type: String,
          default:"dealers"
      },
       icon: {type:String},
    dropdownListOptions: { type: Array },
    page: {
          type:String,
      }

}, { timestamps: true });


module.exports = mongoose.models.DealersCollaborationForm || mongoose.model("DealersCollaborationForm", dealersCollaborationFormSchema);
