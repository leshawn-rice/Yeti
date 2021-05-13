const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth');
const User = require('../models/User');
const PostRating = require('../models/PostRating');
const { handlePostDownrate, handlePostUprate } = require('../helpers/routes');
const SavedPost = require('../models/SavedPost');
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
    const { post, rating } = await handlePostUprate(id, user_id);
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
    const { post, rating } = await handlePostDownrate(id, user_id);
    return res.json({ post, rating })
  }
  catch (err) {
    return next(err);
  }
});

router.post('/:username/:id/save', ensureCorrectUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { user_id } = req.body;
    const savedPost = await SavedPost.save(user_id, id);
    return res.json({ post: savedPost });
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/:username/:id/unsave', ensureCorrectUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { user_id } = req.body;
    const savedPost = await SavedPost.delete(user_id, id);
    return res.json({ post: savedPost });
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/:username/:id', ensureCorrectUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await Post.delete(id);
    return res.json({ message });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;