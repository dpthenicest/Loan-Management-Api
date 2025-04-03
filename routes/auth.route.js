const express = require("express");
const { login, logout } = require("../controllers/auth.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", login);
router.post("/logout", authenticateUser, logout);

module.exports = router;
