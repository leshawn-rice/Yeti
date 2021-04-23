const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    User.register('test@test.com', 'password');
    return res.send("Thank you!")
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;