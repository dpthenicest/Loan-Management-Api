const jwt = require("jsonwebtoken");
const { staffData } = require("../utils/dataLoader");

// Login Controller
const login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = staffData.find(
      (staff) => staff.email === email && staff.password === password
    );

    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

// Logout Controller
const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

module.exports = { login, logout };
