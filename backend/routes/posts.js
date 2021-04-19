const express = require('express');
const Post = require('../models/Post');
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

module.exports = router;