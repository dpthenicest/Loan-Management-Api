require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/auth.route.js");
const loansRoutes = require("./routes/loans.route.js");
const loanRoutes = require("./routes/loan.route.js")
const errorHandler = require("./middlewares/global.error.js")

const app = express();
const port = process.env.PORT || 8000;

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 2 minutes",
  headers: true,
});

app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/loans", loansRoutes);
app.use("/loan", loanRoutes);

// Global Error Handle
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
