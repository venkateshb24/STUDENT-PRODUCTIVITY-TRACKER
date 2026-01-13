const mongoose=require("mongoose");
const user = require("./user");

const productivitySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:String,
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

module.exports=mongoose.model("Productivity",productivitySchema);