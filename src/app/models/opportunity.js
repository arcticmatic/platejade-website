import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  id:{
  type:String,
},
  mainText: {
      type:String,
  },
 title: {
    type: String,
  },
  text: {
    type: String,
  },
  icon: {
    type:String,
  },

   
}, { timestamps: true });


module.exports = mongoose.models.Opportunity || mongoose.model("Opportunity", opportunitySchema);
