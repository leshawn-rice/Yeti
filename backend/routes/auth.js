const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    return res.send("Thank you!")
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;