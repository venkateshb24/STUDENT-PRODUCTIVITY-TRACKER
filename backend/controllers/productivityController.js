const Productivity = require("../models/Productivity");
const DSAProgress = require("../models/DsaProgress");
const PlannerGoal = require("../models/PlannerGoal");
const QuizAttempt = require("../models/QuizAttempt");
const User = require("../models/User");

const startOfDay = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const toNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const sameDay = (a, b) =>
  a instanceof Date &&
  b instanceof Date &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const normalizeUserLogDates = async (userId) => {
  const logs = await Productivity.find({ userId });
  await Promise.all(logs.map((log) => {
    const normalizedDate = startOfDay(new Date(log.date));
    if (Number.isNaN(normalizedDate.getTime())) {
      return Promise.resolve();
    }

    return Productivity.updateOne(
      { _id: log._id },
      { $set: { date: normalizedDate } }
    );
  }));
};

exports.saveTodayLog = async (req, res) => {
  try {
    const today = startOfDay();
    const userId = req.user.userId;

    await normalizeUserLogDates(userId);

    const dsaCount = toNumber(req.body.dsaCount);
    const studyHours = toNumber(req.body.studyHours);

    if (Number.isNaN(dsaCount) || dsaCount < 0) {
      return res.status(400).json({ message: "DSA count must be a positive number" });
    }

    if (Number.isNaN(studyHours) || studyHours < 0) {
      return res.status(400).json({ message: "Study hours must be a positive number" });
    }

    const updateFields = {};
    if (req.body.dsaCount !== undefined) updateFields.dsaCount = dsaCount;
    if (req.body.studyHours !== undefined) updateFields.studyHours = studyHours;
    if (req.body.notes !== undefined) updateFields.notes = req.body.notes;

    const log = await Productivity.findOneAndUpdate(
      { userId, date: today },
      { $set: updateFields },
      { new: true, upsert: true }
    );

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const yesterday = startOfDay();
    yesterday.setDate(yesterday.getDate() - 1);

    const lastLogDate = user.lastLogDate
      ? startOfDay(new Date(user.lastLogDate))
      : null;

    let newStreak = user.streak;
    if (sameDay(lastLogDate, today)) {
      newStreak = user.streak;
    } else if (sameDay(lastLogDate, yesterday)) {
      newStreak = user.streak + 1;
    } else {
      newStreak = 1;
    }

    const allLogs = await Productivity.find({ userId });
    const totalStudyHours = allLogs.reduce(
      (sum, item) => sum + (Number(item.studyHours) || 0),
      0
    );

    await User.findByIdAndUpdate(userId, {
      streak: newStreak,
      lastLogDate: today,
      totalStudyHours,
    });

    res.json({ message: "Log saved", log });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Productivity
      .find({ userId: req.user.userId })
      .sort({ date: -1 });

    res.json({ logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    await normalizeUserLogDates(userId);

    const logs = await Productivity
      .find({ userId })
      .sort({ date: -1 });

    const thisMonthLoggedDays = logs
      .filter((log) => {
        const logDate = new Date(log.date);
        return logDate >= monthStart && logDate < nextMonthStart;
      })
      .map((log) => new Date(log.date).getDate());

    const [dsaProgress, totalGoals, completedGoals, quizAttempts, quizBest] = await Promise.all([
      DSAProgress.findOne({ userId }),
      PlannerGoal.countDocuments({
        userId,
        month: now.getMonth(),
        year: now.getFullYear(),
      }),
      PlannerGoal.countDocuments({
        userId,
        month: now.getMonth(),
        year: now.getFullYear(),
        completed: true,
      }),
      QuizAttempt.countDocuments({ userId }),
      QuizAttempt.findOne({ userId }).sort({ percent: -1 }),
    ]);

    const quizAverage = await QuizAttempt.aggregate([
      { $match: { userId: user._id } },
      { $group: { _id: null, averagePercent: { $avg: "$percent" } } },
    ]);

    const daysPassed = now.getDate();
    const consistencyPercent = daysPassed > 0
      ? Math.min((thisMonthLoggedDays.length / daysPassed) * 100, 100)
      : 0;
    const plannerPercent = totalGoals > 0
      ? Math.round((completedGoals / totalGoals) * 100)
      : 0;
    const quizBestPercent = quizBest ? quizBest.percent : 0;
    const totalProblems = dsaProgress
      ? dsaProgress.completedProblems.length
      : user.totalProblems;
    const quizAveragePercent = quizAverage[0]
      ? Math.round(quizAverage[0].averagePercent)
      : 0;

    if (user.totalProblems !== totalProblems) {
      await User.findByIdAndUpdate(userId, { totalProblems });
    }

    const readinessScore = Math.min(Math.round(
      Math.min(totalProblems * 0.6, 40) +
      Math.min(user.streak * 2, 20) +
      (consistencyPercent * 0.2) +
      (plannerPercent * 0.1) +
      (quizBestPercent * 0.1)
    ), 100);

    res.json({
      user: {
        username: user.username,
        streak: user.streak,
        totalProblems,
        totalStudyHours: user.totalStudyHours,
      },
      readinessScore,
      thisMonthLoggedDays,
      recentLogs: logs.slice(0, 5),
      plannerStats: {
        totalGoals,
        completedGoals,
        percent: plannerPercent,
      },
      quizStats: {
        attempts: quizAttempts,
        bestPercent: quizBestPercent,
        averagePercent: quizAveragePercent,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
