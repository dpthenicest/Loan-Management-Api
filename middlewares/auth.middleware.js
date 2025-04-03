const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new Error("Access Denied");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    const error = new Error("Invalid Token Format");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(error);
  }
};
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    const error = new Error("Access Forbidden: Admins only");
    error.statusCode = 403;
    return next(error);
  }
  next();
};

const isSuperAdmin = (req, res, next) => {
  if (req.user?.role !== "superAdmin") {
    const error = new Error("Access Forbidden: Superadmins only");
    error.statusCode = 403;
    return next(error);
  }
  
  next();
};

const isAdminOrSuperAdmin = (req, res, next) => {
  const userRole = req.user?.role;

  if (userRole !== "admin" && userRole !== "superAdmin") {
    const error = new Error("Access Forbidden: Admins and Superadmins only");
    error.statusCode = 403;
    return next(error);
  }
  next();
};

module.exports = {
  authenticateUser,
  isAdmin,
  isSuperAdmin,
  isAdminOrSuperAdmin,
};

module.exports = { authenticateUser, isAdmin, isSuperAdmin, isAdminOrSuperAdmin };
