// External Dependencies
const express = require('express');
const { ensureCorrectUser } = require('../middleware/auth');
// Internal Dependencies
const User = require('../models/User');
// const { createUserToken, decodeToken } = require('../helpers/tokens');
// const { sendEmail, createConfirmationEmail } = require('../helpers/email');
const router = express.Router();

router.delete('/:username', ensureCorrectUser, async (req, res, next) => {
  try {
    const { username } = req.params;
    const message = await User.delete(username);
    return res.json(message);
  }
  catch (err) {
    return next(err);
  }
})

module.exports = router;