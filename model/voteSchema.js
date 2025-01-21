const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    pollId: String, // References the poll
    identifier: String, // Could be IP address, user ID, or cookie
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", voteSchema);
module.exports = Vote;
