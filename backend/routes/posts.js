const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { ensureCorrectUser } = require('../middleware/auth');
const User = require('../models/User');
const PostRating = require('../models/PostRating');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.getAll();
    return res.json({ posts });
  }
  catch (err) {
    return next(err);
  }
});

router.get('/find', async (req, res, next) => {
  try {
    const { latitude, longitude, distance } = req.query;
    const posts = await Post.getByLocation(latitude, longitude, distance);
    return res.json({ posts });
  }
  catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.getById(req.params.id);
    const comments = await Comment.getByPostId(req.params.id);
    post.comments = comments;
    return res.json({ post });
  }
  catch (err) {
    return next(err);
  }
});

router.get('/user/:id', async (req, res, next) => {
  try {
    const post = await Post.getByUserId(req.params.id);
    return res.json({ post });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/:username', ensureCorrectUser, async (req, res, next) => {
  try {
    const { body, location } = req.body;
    const username = req.params.username;
    const post = await Post.create(username, body, location);
    return res.json({ post });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/:id/uprate', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { user_id } = req.body;
    const { rating, wasUprated, wasDownrated } = await PostRating.uprate(user_id, id);
    let post;
    if (wasUprated) {
      post = await Post.downrate(id);
    }
    else if (wasDownrated) {
      // uprate twice if it was downrated before
      await Post.uprate(id);
      post = await Post.uprate(id);
    }
    else {
      post = await Post.uprate(id);
    }
    return res.json({ post, rating })
  }
  catch (err) {
    return next(err);
  }
});

router.post('/:id/downrate', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { user_id } = req.body;
    const { rating, wasUprated, wasDownrated } = await PostRating.downrate(user_id, id);
    let post;
    if (wasDownrated) {
      post = await Post.uprate(id);
    }
    else if (wasUprated) {
      // downrate twice if it was uprated before
      await Post.downrate(id);
      post = await Post.downrate(id);
    }
    else {
      post = await Post.downrate(id);
    }
    return res.json({ post, rating })
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;