import mongoose from 'mongoose';

const formsDescriptionSchema = new mongoose.Schema({

    text:{
     type: String
    },
    page: {
        type:String
    }

}, { timestamps: true });


module.exports = mongoose.models.FormsDescription || mongoose.model("FormsDescription", formsDescriptionSchema);
