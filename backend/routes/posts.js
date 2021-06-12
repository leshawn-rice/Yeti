const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { ensureCorrectUser } = require('../middleware/auth');
const { handlePostDownrate, handlePostUprate } = require('../helpers/routes');
const SavedPost = require('../models/SavedPost');
const router = express.Router();

/** GET /posts =>  { posts: [post, post, post ... ] }
 * 
 *  Gets all the posts in the database
 *
 *  Post is { id, body, rating, latitude, longitude, user_id }
 *
 * Authorization required: none
 */

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.getAll();
    return res.json({ posts });
  }
  catch (err) {
    return next(err);
  }
});

/** GET /posts/find {latitude, longitude, distance} =>  { posts: [post, post, post ... ] }
 * 
 *  Gets all the posts within the given distance of the given lat/long coordinates
 *
 *  Post is { id, body, rating, latitude, longitude, user_id }
 *
 * Authorization required: none
 */

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

/** GET /posts/:id =>  { post }
 * 
 *  Gets the post with the given id
 *
 *  Post is { id, body, rating, latitude, longitude, user_id }
 *
 *  Authorization required: none
 */

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

/** GET /posts/:id =>  { posts: [post, post, post ...] }
 * 
 *  Gets the posts by the user with the given id
 *
 *  Post is { id, body, rating, latitude, longitude, user_id }
 *
 *  Authorization required: none
 */

router.get('/user/:id', async (req, res, next) => {
  try {
    const posts = await Post.getByUserId(req.params.id);
    return res.json({ posts });
  }
  catch (err) {
    return next(err);
  }
});

/** POST /posts/:username {body, location} => post
 *  
 * Creates a new post with the given body and location for the user with the username in the path
 * 
 * Post is { id, body, rating, latitude, longitude, user_id }
 *
 * Authorization required: correct user
 */

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

/** POST /posts/:id/uprate =>  { post, rating }
 * 
 *  Uprates a post
 *
 *  Post is { id, body, rating, latitude, longitude, user_id }
 *  Rating is {id, user_id, post_id, rating}
 *
 *  Authorization required: none
 */

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

/** POST /posts/:id/downrate =>  { post, rating }
 * 
 *  Downrates a post
 *
 *  Post is { id, body, rating, latitude, longitude, user_id }
 *  Rating is {id, user_id, post_id, rating}
 *
 *  Authorization required: none
 */

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

/** POST /posts/:username/:id/save =>  { post }
 * 
 *  Saves a post
 *
 *  Post is { id, body, rating, latitude, longitude, user_id }
 *
 *  Authorization required: correct user
 */

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

/** DELETE /posts/:username/:id/unsave =>  { post }
 * 
 *  Unsaves a post
 *
 *  Post is { id, body, rating, latitude, longitude, user_id }
 *
 *  Authorization required: correct user
 */

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

/** DELETE /posts/:username/:id =>  { message }
 * 
 *  Deletes a post
 *
 *  Authorization required: correct user
 */

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