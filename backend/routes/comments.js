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

router.post('/:id/uprate', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { user_id } = req.body;
    const { rating, wasUprated, wasDownrated } = await CommentRating.uprate(user_id, id);
    let comment;
    if (wasUprated) {
      comment = await Comment.downrate(id);
    }
    else if (wasDownrated) {
      // uprate twice if it was downrated before
      await Comment.uprate(id);
      comment = await Comment.uprate(id);
    }
    else {
      comment = await Comment.uprate(id);
    }
    return res.json({ comment, rating })
  }
  catch (err) {
    return next(err);
  }
});

router.post('/:id/downrate', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { user_id } = req.body;
    const { rating, wasUprated, wasDownrated } = await CommentRating.downrate(user_id, id);
    let comment;
    if (wasDownrated) {
      comment = await Comment.uprate(id);
    }
    else if (wasUprated) {
      // downrate twice if it was uprated before
      await Comment.downrate(id);
      comment = await Comment.downrate(id);
    }
    else {
      comment = await Comment.downrate(id);
    }
    return res.json({ comment, rating })
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;