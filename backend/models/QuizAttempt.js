const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 1,
  },
  percent: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
}, { timestamps: true });

quizAttemptSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.models.QuizAttempt ||
  mongoose.model("QuizAttempt", quizAttemptSchema);
