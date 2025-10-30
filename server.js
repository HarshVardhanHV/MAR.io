const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const scoreRoutes = require("./routes/scoreRoutes");
app.use("/api/scores", scoreRoutes);


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
