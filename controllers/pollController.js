const Poll = require("../model/poolSchema");
const Vote = require("../model/voteSchema");

// Create a new poll
exports.createPoll = async (req, res) => {
  try {
    const { pollId, question, options } = req.body;
    console.log({ pollId, question, options });
    console.log(req.body);
    const existingPoll = await Poll.findOne({ pollId });
    if (existingPoll) {
      return res.status(400).json({ message: "Already Exist Poll" });
    }

    const poll = new Poll({
      pollId,
      question,
      options,
      votes: Array(options.length).fill(0),
    });

    await poll.save();
    res.status(201).send({ message: "Poll created successfully.", poll });
  } catch (error) {
    res.status(500).send({ error: "Failed to create poll." });
  }
};

// Submit a vote
exports.submitVote = async (req, res) => {
  try {
    const { optionIndex, pollId } = req.body;
    const identifier = req.cookies.identifier || `${req.ip}-${req.headers['user-agent']}`;


    const existingVote = await Vote.findOne({ pollId, identifier });
    if (existingVote) return res.status(403).send("You have already voted.");

    const poll = await Poll.findOne({pollId});
    if (!poll) return res.status(404).send("Poll not found.");

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).send("Invalid option index.");
    }

    poll.votes[optionIndex] += 1;
    await poll.save();

    const vote = new Vote({ pollId, identifier });
    await vote.save();

    res.send("Vote submitted successfully.");
  } catch (error) {
    res.status(500).send({ error: "Failed to submit vote." });
  }
};

// Get poll results
exports.getPollResults = async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findOne({ pollId });

    if (!poll) return res.status(404).send("Poll not found.");

    res.send({
      pollId: poll.pollId,
      question: poll.question,
      options: poll.options,
      votes: poll.votes,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error: "Failed to fetch poll results." });
  }
};
// Get last poll results
exports.getLastPollResults = async (req, res) => {
  try {
    const poll = await Poll.findOne({}).sort({ createdAt: -1 });

    if (!poll) return res.status(404).send("Poll not found.");

    res.send({
      id: poll._id,
      question: poll.question,
      options: poll.options,
      votes: poll.votes,
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch poll results." });
  }
};

// Delete a poll
exports.deletePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByIdAndDelete(id);

    if (!poll) return res.status(404).send({ error: "Poll not found." });

    res.status(200).send({ message: "Poll deleted successfully." });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete poll." });
  }
};

// Update a poll
exports.updatePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options } = req.body;

    const poll = await Poll.findById(id);
    if (!poll) return res.status(404).send({ error: "Poll not found." });

    if (question) poll.question = question;
    if (options) {
      if (options.length < 2) {
        return res
          .status(400)
          .send({ error: "Poll must have at least two options." });
      }
      poll.options = options;
      poll.votes = Array(options.length).fill(0);
    }

    await poll.save();
    res.status(200).send({ message: "Poll updated successfully.", poll });
  } catch (error) {
    res.status(500).send({ error: "Failed to update poll." });
  }
};

exports.checkVoteStatus = async (req, res) => {
  try {
    const { pollId } = req.params;
    const identifier = req.cookies.identifier || `${req.ip}-${req.headers['user-agent']}`;

    console.log({ pollId });
    // Validate the input
    if (!pollId) {
      return res.status(400).json({ message: "Poll ID is required." });
    }

    // Check if the vote exists
    const existingVote = await Vote.findOne({ pollId: pollId, identifier });
    console.log({ existingVote });
    console.log({ identifier });
    if (existingVote) {
      return res
        .status(200)
        .json({ message: "You have already voted.", hasVoted: true });
    }

    // If no vote is found, return success
    return res
      .status(200)
      .json({ message: "You have not voted yet.", hasVoted: false });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error checking vote status:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
