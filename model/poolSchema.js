const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    pollId: String,
    question: String,
    options: [String],
    votes: [Number], // Number of votes per option
  },
  { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);
module.exports = Poll;
