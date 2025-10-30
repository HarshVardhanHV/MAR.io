// routes/scoreRoutes.js
const express = require("express");
const { saveScore, getLeaderboard, getUserScores } = require("../controllers/scoreController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// Save score
router.post("/", auth, saveScore);

// Get leaderboard
router.get("/leaderboard", getLeaderboard);

// Get user's scores
router.get("/:userId", auth, getUserScores);

module.exports = router;
