const DSAProgress = require("../models/DsaProgress");
const User = require("../models/User");

// ── GET PROGRESS ─────────────────────────────────────────
// Returns the user's completed problem IDs and notes
// Frontend uses this to know which checkboxes to tick on load
exports.getProgress = async (req, res) => {
  try {
    const userId = req.user.userId;

    // findOne returns null if no document exists yet
    let progress = await DSAProgress.findOne({ userId });

    // if user has never opened DSA page before, no document exists
    // we return empty defaults so frontend doesn't crash
    if (!progress) {
      await User.findByIdAndUpdate(userId, { totalProblems: 0 });
      return res.json({ completedProblems: [], notes: {} });
    }

    // Convert Map to plain object for JSON response
    // Maps don't serialize to JSON automatically
    const notesObj = {};
    progress.notes.forEach((value, key) => {
      notesObj[key] = value;
    });

    await User.findByIdAndUpdate(userId, {
      totalProblems: progress.completedProblems.length,
    });

    res.json({
      completedProblems: progress.completedProblems,
      notes: notesObj,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── TOGGLE PROBLEM COMPLETE ──────────────────────────────
// Called when user ticks or unticks a checkbox
// If problem is in completedProblems → remove it (untick)
// If problem is not in completedProblems → add it (tick)
exports.toggleProblem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { problemId } = req.body;

    if (!problemId) {
      return res.status(400).json({ message: "problemId required" });
    }

    // find or create the progress document for this user
    let progress = await DSAProgress.findOne({ userId });
    if (!progress) {
      progress = new DSAProgress({ userId, completedProblems: [], notes: {} });
    }

    const index = progress.completedProblems.indexOf(problemId);

    if (index === -1) {
      // not in array → add it (mark as done)
      progress.completedProblems.push(problemId);
    } else {
      // already in array → remove it (mark as undone)
      // splice(index, 1) removes 1 element at that index
      progress.completedProblems.splice(index, 1);
    }

    await progress.save();
    await User.findByIdAndUpdate(userId, {
      totalProblems: progress.completedProblems.length,
    });

    res.json({
      completedProblems: progress.completedProblems,
      totalProblems: progress.completedProblems.length,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── SAVE NOTE ────────────────────────────────────────────
// Called when user types a note for a problem and saves
exports.saveNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { problemId, note } = req.body;

    if (!problemId) {
      return res.status(400).json({ message: "problemId required" });
    }

    let progress = await DSAProgress.findOne({ userId });
    if (!progress) {
      progress = new DSAProgress({ userId, completedProblems: [], notes: {} });
    }

    // set the note for this problem ID
    // if note is empty string, delete the key to keep it clean
    if (note && note.trim()) {
      progress.notes.set(problemId, note.trim());
    } else {
      progress.notes.delete(problemId);
    }

    await progress.save();

    res.json({ message: "Note saved" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
