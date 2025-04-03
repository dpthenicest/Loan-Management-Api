const fs = require("fs");
const path = require("path");

const loansFilePath = path.join(__dirname, "..", "data", "loans.json");

// Utility function to delete a loan by ID
const deleteLoanFromFile = (loanId) => {
  try {
    const data = fs.readFileSync(loansFilePath, "utf8");
    const loansData = JSON.parse(data);

    const loanIndex = loansData.findIndex((loan) => loan.id === loanId);

    if (loanIndex === -1) {
      return { success: false, message: "Loan not found" };
    }

    loansData.splice(loanIndex, 1);
    fs.writeFileSync(loansFilePath, JSON.stringify(loansData, null, 2));

    return { success: true, message: "Loan deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting loan: ${error.message}`);
  }
};

module.exports = deleteLoanFromFile; // Exporting the function
