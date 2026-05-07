const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null, // optional for now, ready for later
  },

  // ── These three fields power the dashboard + leaderboard ──

  streak: {
    type: Number,
    default: 0,
    // how many consecutive days the user has logged
  },
  lastLogDate: {
    type: Date,
    default: null,
  },
  totalProblems: {
    type: Number,
    default: 0,
    // count of checked problems in the DSA tracker
  },
  totalStudyHours: {
    type: Number,
    default: 0,
    // sum of all studyHours across all logs
  },
  plannerTotalGoals: {
    type: Number,
    default: 0,
  },
  plannerCompletedGoals: {
    type: Number,
    default: 0,
  },
  quizAttempts: {
    type: Number,
    default: 0,
  },
  quizBestPercent: {
    type: Number,
    default: 0,
  },
  quizAveragePercent: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
