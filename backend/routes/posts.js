const express = require('express');
const Post = require('../models/Post');
const { ensureCorrectUser } = require('../middleware/auth');
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

module.exports = router;