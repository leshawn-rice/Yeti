const express = require('express');
const Comment = require('../models/Comment');
const { ensureCorrectUser } = require('../middleware/auth');
const { handleCommentDownrate, handleCommentUprate } = require('../helpers/routes');
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
    const { comment, rating } = await handleCommentUprate(id, user_id);
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
    const { comment, rating } = await handleCommentDownrate(id, user_id);
    return res.json({ comment, rating })
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;