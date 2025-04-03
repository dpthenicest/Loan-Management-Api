const express = require("express");
const {
  getLoans,
  getUserLoans,
  getExpiredLoans,
  deleteLoan,
} = require("../controllers/loans.controller");
const {
  authenticateUser,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticateUser, getLoans);
router.get("/:userEmail/get", authenticateUser, getUserLoans);
router.get("/expired", authenticateUser, getExpiredLoans);

module.exports = router;
