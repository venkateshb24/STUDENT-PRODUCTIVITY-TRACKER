const mongoose = require("mongoose");

// This model stores which problems a user has completed
// and any notes they wrote for each problem
//
// Structure:
// one document per user
// completedProblems = array of problem IDs like ["arr_1", "arr_2", "tree_3"]
// notes = object where key is problemId, value is the note text
//         { "arr_1": "use hashmap here", "tree_3": "remember inorder" }

const dsaProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one document per user
  },
  completedProblems: {
    type: [String], // array of problem ID strings
    default: [],
  },
  notes: {
    type: Map,       // Map lets us use dynamic keys (problemId as key)
    of: String,      // value is a string (the note text)
    default: {},
  },
});

module.exports = mongoose.models.DSAProgress ||
  mongoose.model("DSAProgress", dsaProgressSchema);