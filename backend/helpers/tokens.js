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

/** return signed JWT from email */

function createEmailToken(email) {
  let payload = {
    email
  };

  // Create 15-minute expiration time
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: 900
  });
}

/** Decodes the given token with the secret key */

function decodeToken(token) {
  let decoded = jwt.decode(token, SECRET_KEY);
  return decoded;
}

/** Verifies the given token was signed with the secret key */

function verifyToken(token) {
  try {
    if (jwt.verify(token, SECRET_KEY)) return true;
  }
  catch (err) {
    return false
  }
  return false;
}

module.exports = { createUserToken, createEmailToken, decodeToken, verifyToken };