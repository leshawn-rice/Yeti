const express = require('express');
const User = require('../models/User');
const { createToken } = require('../helpers/tokens');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.register(email, password);
    const token = createToken(user);
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
    const token = createToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;