"use strict";

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;
const SERVER_EMAIL = {
  email: process.env.EMAIL || null,
  password: process.env.EMAIL_PASSWORD || null
}
// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
    ? "yeti_test"
    : process.env.DATABASE_URL || "yeti";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested

// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  SERVER_EMAIL
};
