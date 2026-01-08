const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// 🔥 CORS CONFIG
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
};

app.use(cors(corsOptions));

// 🔥 IMPORTANT: handle preflight
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
