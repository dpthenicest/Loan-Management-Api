const { loansData } = require("../utils/dataLoader");

// Fetch Loan (filters loan by status and user role) Controller
const getLoans = (req, res, next) => {
  try {
    const { status } = req.query;
    const userRole = req.user?.role;

    let filteredLoans = loansData;

    if (status) {
      if (status !== "pending" && status !== "active") {
        const error = new Error(
          "Invalid status. Please use 'pending' or 'active'."
        );
        error.statusCode = 400;
        return next(error);
      }

      filteredLoans = loansData.filter((loan) => loan.status === status);
    }

    filteredLoans = filteredLoans.map((loan) => {
      if (userRole === "admin" || userRole === "superAdmin") {
        return loan;
      }

      const { totalLoan, ...applicantWithoutTotalLoan } = loan.applicant; 
      const loanWithoutTotalLoan = {
        ...loan,
        applicant: applicantWithoutTotalLoan,
      };

      return loanWithoutTotalLoan;
    });

    res.json(filteredLoans);
  } catch (error) {
    next(error);
  }
};

// Fetch loans by email Controller
const getUserLoans = (req, res, next) => {
  const { userEmail } = req.params;
  const userRole = req.user?.role; 

  try {
    
    let userLoans = loansData.filter((loan) => loan.applicant.email === userEmail);

    userLoans = userLoans.map((loan) => {
      if (userRole === "admin" || userRole === "superAdmin") {
        return loan; 
      }

      const { totalLoan, ...applicantWithoutTotalLoan } = loan.applicant; 
      const loanWithoutTotalLoan = { 
        ...loan, 
        applicant: applicantWithoutTotalLoan 
      };
      
      return loanWithoutTotalLoan;
    });

    res.json({ loans: userLoans });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserLoans };

// Fetch Expired Loans Controller
const getExpiredLoans = (req, res, next) => {
  try {
    const currentDate = new Date();

    const expiredLoans = loansData.filter((loan) => {
      const maturityDate = new Date(loan.maturityDate.replace(" ", "T"));
      return maturityDate < currentDate;
    });

    if (!expiredLoans || expiredLoans.length === 0) {
      const error = new Error("No expired loans found");
      error.statusCode = 404;
      return next(error);
    }

    res.json(expiredLoans);
  } catch (error) {
    next(error);
  }
};

module.exports = { getLoans, getUserLoans, getExpiredLoans };
