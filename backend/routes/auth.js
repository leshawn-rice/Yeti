// External Dependencies
const express = require('express');
// Internal Dependencies
const User = require('../models/User');
const { createUserToken, decodeToken } = require('../helpers/tokens');
const { sendEmail, createConfirmationEmail } = require('../helpers/email');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.register(email, password);
    const token = createUserToken(user);
    const emailOptions = createConfirmationEmail(email);
    sendEmail(emailOptions);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});


router.post('/confirm-email', async (req, res, next) => {
  try {
    const { emailToken } = req.body;
    console.log(req.body);
    console.log(emailToken);
    const decodedToken = decodeToken(emailToken);
    const user = await User.confirmEmail(decodedToken);
    const userToken = createUserToken(user);
    return res.json({ token: userToken, user });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;