// External Dependencies
const express = require('express');
const { ensureCorrectUser } = require('../middleware/auth');
// Internal Dependencies
const User = require('../models/User');
const { sendEmail } = require('../helpers/email');
const { SERVER_EMAIL } = require('../config');
const { getUserData } = require('../helpers/routes');
const { createUserToken } = require('../helpers/tokens');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.getById(req.params.id);
    return res.json({ user });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/contact', async (req, res, next) => {
  try {
    const { email, subject, body } = req.body;
    const text = `FROM: ${email}\n${body}`;
    const options = { to: SERVER_EMAIL.email, subject, text }
    await sendEmail(options);
    return res.json({ message: 'Your email has been sent' });
  }
  catch (err) {
    return next(err);
  }
});

router.patch('/:username/change-email', ensureCorrectUser, async (req, res, next) => {
  try {
    const username = req.params.username;
    const { email } = req.body;
    const rawUser = await User.changeEmail(username, email);
    const user = await getUserData(rawUser);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

router.patch('/:username/change-password', ensureCorrectUser, async (req, res, next) => {
  try {
    const username = req.params.username;
    const { oldPassword, newPassword } = req.body;
    const rawUser = await User.changePassword(username, oldPassword, newPassword);
    const user = await getUserData(rawUser);
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/:username', ensureCorrectUser, async (req, res, next) => {
  try {
    const { username } = req.params;
    const message = await User.delete(username);
    return res.json(message);
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;