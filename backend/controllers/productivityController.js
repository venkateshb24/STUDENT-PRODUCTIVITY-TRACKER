const Productivity = require("../models/Productivity");

exports.saveTodayLog = async (req, res) => {
  const today = new Date().toDateString();

  const updateFields = {};
  if (req.body.dsaCount !== undefined) updateFields.dsaCount = req.body.dsaCount;
  if (req.body.studyHours !== undefined) updateFields.studyHours = req.body.studyHours;
  if (req.body.notes !== undefined) updateFields.notes = req.body.notes;

  const log = await Productivity.findOneAndUpdate(
    { userId: req.user.userId, date: today },
    { $set: updateFields },
    { new: true, upsert: true }
  );

  res.json({ message: "Daily log saved", log });
};

exports.getAllLogs = async (req, res) => {
  const logs = await Productivity
    .find({ userId: req.user.userId })
    .sort({ date: -1 });

  res.json({ logs });
};