const express = require("express");
const pollController = require("../controllers/pollController");

const router = express.Router();
// create poll
router.post("/create-polls", pollController.createPoll);
//submit vote
router.post("/submit-polls", pollController.submitVote);
//get single poll
router.get("/polls/:pollId", pollController.getPollResults);
router.get("/get-last-poll", pollController.getLastPollResults);
//delete poll
router.delete("/polls/:id", pollController.deletePoll);
// update poll
router.put("/polls/:id", pollController.updatePoll);
// 
router.get("/check-Vote-Status/:pollId", pollController.checkVoteStatus);

module.exports = router;
