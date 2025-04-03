const fs = require("fs");
const path = require("path");

// Utility function to load the json data
const loadData = (fileName) => {
  try {
    const filePath = path.join(__dirname, "../data", fileName);
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error.message);
    return [];
  }
};

const staffData = loadData("staffs.json");
const loansData = loadData("loans.json");

module.exports = { staffData, loansData };
