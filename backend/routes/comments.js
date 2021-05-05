const express = require('express');
const Comment = require('../models/Comment');
const { ensureCorrectUser } = require('../middleware/auth');
const router = express.Router();

router.post('/:username', ensureCorrectUser, async (req, res, next) => {
  try {
    const { comment, postId } = req.body;
    const username = req.params.username;
    const newComment = await Comment.create(username, comment, postId);
    return res.json({ comment: newComment });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;