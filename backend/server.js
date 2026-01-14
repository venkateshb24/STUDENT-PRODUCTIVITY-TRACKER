const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors());           
app.use(express.json());

connectDB();

app.use("/auth", require("./routes/authRoutes"));
app.use("/productivity", require("./routes/productivityRoutes"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
