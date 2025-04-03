const deleteLoanFromFile = require("../utils/deleteLoan");

// Delete Loan by loanID Controller
const deleteLoan = (req, res, next) => {
  const { loanId } = req.params;

  try {
    const result = deleteLoanFromFile(loanId);

    if (result.success) {
      return res.json({ message: result.message });
    } else {
      const error = new Error("Loan not found");
      error.statusCode = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteLoan };
