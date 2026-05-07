const mongoose = require("mongoose");

// One document per goal
// User can have many goals per month
// We filter by month + year to show current month's goals

const plannerGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true, // the goal text e.g. "Complete 50 DSA problems"
  },
  completed: {
    type: Boolean,
    default: false,
  },
  month: {
    type: Number,
    required: true, // 0-11 (JS month format, Jan=0, Dec=11)
  },
  year: {
    type: Number,
    required: true,
  },
}, { timestamps: true }); // adds createdAt automatically

module.exports = mongoose.models.PlannerGoal ||
  mongoose.model("PlannerGoal", plannerGoalSchema);