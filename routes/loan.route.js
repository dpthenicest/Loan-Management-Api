const express = require("express");
const { deleteLoan } = require("../controllers/loan.controller");
const { isSuperAdmin, authenticateUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.delete("/:loanId/delete", authenticateUser, isSuperAdmin, deleteLoan);

module.exports = router;
