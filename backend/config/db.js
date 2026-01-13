const mongoose=require("mongoose");

const connectDB=async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/student_tracker");
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports=connectDB;