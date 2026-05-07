const PlannerGoal = require("../models/PlannerGoal");
const User = require("../models/User");

const syncPlannerStats = async (userId) => {
  const now = new Date();
  const query = {
    userId,
    month: now.getMonth(),
    year: now.getFullYear(),
  };

  const [plannerTotalGoals, plannerCompletedGoals] = await Promise.all([
    PlannerGoal.countDocuments(query),
    PlannerGoal.countDocuments({ ...query, completed: true }),
  ]);

  await User.findByIdAndUpdate(userId, {
    plannerTotalGoals,
    plannerCompletedGoals,
  });

  return { plannerTotalGoals, plannerCompletedGoals };
};

// ── GET THIS MONTH'S GOALS ───────────────────────────────
exports.getGoals = async (req, res) => {
  try {
    const now = new Date();
    const userId = req.user.userId;
    const goals = await PlannerGoal.find({
      userId,
      month: now.getMonth(),
      year: now.getFullYear(),
    }).sort({ createdAt: 1 }); // oldest first so order stays stable

    await syncPlannerStats(userId);

    res.json({ goals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── ADD A GOAL ───────────────────────────────────────────
exports.addGoal = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Goal text is required" });
    }

    const now = new Date();
    const goal = new PlannerGoal({
      userId: req.user.userId,
      text: text.trim(),
      month: now.getMonth(),
      year: now.getFullYear(),
    });

    await goal.save();
    await syncPlannerStats(req.user.userId);

    res.json({ goal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── TOGGLE GOAL COMPLETE ─────────────────────────────────
exports.toggleGoal = async (req, res) => {
  try {
    const goal = await PlannerGoal.findOne({
      _id: req.params.id,
      userId: req.user.userId, // make sure user owns this goal
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // flip completed value
    goal.completed = !goal.completed;
    await goal.save();
    await syncPlannerStats(req.user.userId);

    res.json({ goal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── DELETE A GOAL ────────────────────────────────────────
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await PlannerGoal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    await syncPlannerStats(req.user.userId);

    res.json({ message: "Goal deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
