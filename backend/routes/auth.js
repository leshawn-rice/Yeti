// External Dependencies
const express = require('express');
// Internal Dependencies
const User = require('../models/User');
const { ensureCorrectUser } = require('../middleware/auth');
const { createUserToken, decodeToken, verifyToken } = require('../helpers/tokens');
const { sendEmail, createConfirmationEmail } = require('../helpers/email');
const { getUserData } = require('../helpers/routes');

const router = express.Router();

router.get('/refresh/:username', ensureCorrectUser, async (req, res, next) => {
  const username = req.params.username;
  const rawUser = await User.getByUsername(username);
  const user = await getUserData(rawUser);
  const token = createUserToken(user);
  return res.json({ token, user });
})

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const rawUser = await User.register(email, password);
    const user = await getUserData(rawUser);
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
    const rawUser = await User.authenticate(email, password);
    const user = await getUserData(rawUser);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/resend-confirmation-email', async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailOptions = createConfirmationEmail(email);
    sendEmail(emailOptions);
    return (res.json({ message: 'Sent!' }));
  }
  catch (err) {
    return next(err);
  }
});


router.post('/confirm-email', async (req, res, next) => {
  try {
    const { emailToken } = req.body;
    const isTokenValid = verifyToken(emailToken);
    const decodedToken = decodeToken(emailToken);
    const rawUser = await User.confirmEmail(decodedToken);
    const user = await getUserData(rawUser);
    const userToken = createUserToken(user);
    return res.json({ token: userToken, user });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;