const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

/** return signed JWT from user data. */

function createUserToken(user) {
  let payload = {
    username: user.username,
    email: user.email,
    rating: user.rating
  };

  return jwt.sign(payload, SECRET_KEY);
}

function createEmailToken(email) {
  let payload = {
    email
  };

  // Create 15-minute expiration time
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: 900
  });
}

function decodeToken(token) {
  let decoded = jwt.decode(token, SECRET_KEY);
  return decoded;
}

module.exports = { createUserToken, createEmailToken, decodeToken };