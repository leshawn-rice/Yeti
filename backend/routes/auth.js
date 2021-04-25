const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.register(email, password);
    return res.json({ user });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;