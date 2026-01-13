const express=require("express");
const connectDB=require("./config/db");

const app=express();
app.use(express.json());

connectDB();

app.use("/auth",require("./routes/authRoutes"));
app.use("/productivity",require("./routes/productivityRoutes"));

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});