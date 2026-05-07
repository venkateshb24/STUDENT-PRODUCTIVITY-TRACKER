const QuizAttempt = require("../models/QuizAttempt");
const User = require("../models/User");
const mongoose = require("mongoose");

const syncQuizStats = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const [stats] = await QuizAttempt.aggregate([
    { $match: { userId: userObjectId } },
    {
      $group: {
        _id: "$userId",
        quizAttempts: { $sum: 1 },
        quizBestPercent: { $max: "$percent" },
        quizAveragePercent: { $avg: "$percent" },
      },
    },
  ]);

  const updates = stats
    ? {
        quizAttempts: stats.quizAttempts,
        quizBestPercent: Math.round(stats.quizBestPercent),
        quizAveragePercent: Math.round(stats.quizAveragePercent),
      }
    : {
        quizAttempts: 0,
        quizBestPercent: 0,
        quizAveragePercent: 0,
      };

  await User.findByIdAndUpdate(userId, updates);
  return updates;
};

exports.saveAttempt = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { subject } = req.body;
    const score = Number(req.body.score);
    const total = Number(req.body.total);

    if (!subject || !Number.isFinite(score) || !Number.isFinite(total) || total <= 0) {
      return res.status(400).json({ message: "Subject, score, and total are required" });
    }

    if (score < 0 || score > total) {
      return res.status(400).json({ message: "Score must be between 0 and total" });
    }

    const percent = Math.round((score / total) * 100);
    const attempt = await QuizAttempt.create({
      userId,
      subject,
      score,
      total,
      percent,
    });

    const quizStats = await syncQuizStats(userId);

    res.json({
      message: "Quiz attempt saved",
      attempt,
      quizStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
