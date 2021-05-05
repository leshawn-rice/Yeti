// External Dependencies
const express = require('express');
const { ensureCorrectUser } = require('../middleware/auth');
// Internal Dependencies
const User = require('../models/User');
const { sendEmail } = require('../helpers/email');
const { SERVER_EMAIL } = require('../config');
const { response } = require('express');
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

router.post('/contact', (req, res, next) => {
  try {
    const { email, subject, body } = req.body;
    const text = `FROM: ${email}\n${body}`;
    const options = { to: SERVER_EMAIL.email, subject, text }
    sendEmail(options);
    return res.json({ message: 'Your email has been sent' });
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