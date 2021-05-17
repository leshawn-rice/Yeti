"use strict";

require("dotenv").config();

const MAX_RADIAL_DISTANCE = 2.5;
const RADIANS = Math.PI / 180;
const EARTH_RADIUS = 3958.8;

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;
const SERVER_EMAIL = {
  email: process.env.EMAIL || 'test@test.com',
  password: process.env.EMAIL_PASSWORD || 'testpassword'
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
  RADIANS,
  EARTH_RADIUS,
  MAX_RADIAL_DISTANCE,
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  SERVER_EMAIL
};
