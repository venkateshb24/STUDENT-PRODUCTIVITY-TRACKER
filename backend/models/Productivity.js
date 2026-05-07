const mongoose=require("mongoose");

const productivitySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    dsaCount:{
        type:Number,
        default:0
    },
    studyHours:{
        type:Number,
        default:0
    },
    notes:{
        type:String
    }
});

productivitySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.models.Productivity || mongoose.model("Productivity", productivitySchema);
