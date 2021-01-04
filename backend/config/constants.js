const dotenv = require("dotenv");
dotenv.config();

const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};

CONSTANTS.PORT = process.env.PORT || "5000";
CONSTANTS.MONGO_URI = process.env.MONGO_URI;

module.exports = CONSTANTS;
