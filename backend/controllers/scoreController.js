
const Score = require("../models/Score");
const User = require("../models/User");

exports.saveScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { score } = req.body;

    if (score === undefined || score === null) {
      return res.status(400).json({ msg: "Score is required" });
    }

    const newScore = new Score({ user: userId, score });
    await newScore.save();

    const user = await User.findById(userId);
    if (user && score > user.highScore) {
      user.highScore = score;
      await user.save();
    }

    res.status(201).json({
      msg: "Score saved successfully",
      highScore: user?.highScore || score,
    });
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ highScore: -1 })
      .limit(100)
      .select("username highScore");

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getUserScores = async (req, res) => {
  try {
    const { userId } = req.params;
    const scores = await Score.find({ user: userId }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
