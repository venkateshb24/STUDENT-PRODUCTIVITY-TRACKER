const User = require("../models/User");

// ── GET LEADERBOARD ──────────────────────────────────────
// Returns top 10 users ranked by streak + totalProblems
// Also tells current user their rank and top % position

exports.getLeaderboard = async (req, res) => {
  try {
    const currentUserId = req.user.userId;

    // Fetch all users except password
    // Sort by streak first, then totalProblems as tiebreaker
    const allUsers = await User.find({})
      .select("username streak totalProblems totalStudyHours plannerCompletedGoals plannerTotalGoals quizBestPercent")
      .sort({ streak: -1, totalProblems: -1 });

    // Give each user a rank based on their position
    // rank 1 = best streak, rank 2 = second best etc.
    const ranked = allUsers.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      streak: user.streak,
      totalProblems: user.totalProblems,
      totalStudyHours: user.totalStudyHours,
      plannerCompletedGoals: user.plannerCompletedGoals,
      plannerTotalGoals: user.plannerTotalGoals,
      quizBestPercent: user.quizBestPercent,
      isCurrentUser: user._id.toString() === currentUserId,
    }));

    // top 10 for the leaderboard table
    const top10 = ranked.slice(0, 10);

    // find where the current user sits
    const currentUserEntry = ranked.find(u => u.isCurrentUser);
    const currentUserRank = currentUserEntry ? currentUserEntry.rank : null;

    // top % calculation
    // e.g. rank 3 out of 50 users = top 6%
    const totalUsers = ranked.length;
    const topPercent = currentUserRank
      ? Math.ceil((currentUserRank / totalUsers) * 100)
      : null;

    res.json({
      leaderboard: top10,
      currentUser: {
        rank: currentUserRank,
        topPercent,
        totalUsers,
        ...currentUserEntry,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
