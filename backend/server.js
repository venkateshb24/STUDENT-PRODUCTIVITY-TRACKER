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
app.use("/dsa", require("./routes/DsaRoutes"));
app.use("/planner", require("./routes/PlannerRoutes"));
app.use("/leaderboard", require("./routes/LeaderboardRoutes"));
app.use("/quiz", require("./routes/QuizRoutes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
