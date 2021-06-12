const express = require('express');
const Comment = require('../models/Comment');
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth');
const { handleCommentDownrate, handleCommentUprate } = require('../helpers/routes');
const SavedComment = require('../models/SavedComment');
const router = express.Router();

/** GET /comments/:id =>  { comment }
 *
 *  Comment is { id, comment, rating, user_id, post_id }
 *
 * Authorization required: logged in
 */

router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.getById(id);
    return res.json({ comment });
  }
  catch (err) {
    return next(err);
  }
});

/** POST /comments/:username =>  { comment }
 * 
 *  Creates a new comment
 *
 *  Comment is { id, comment, rating, user_id, post_id }
 *
 * Authorization required: correct user
 */

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

/** POST /comments/:id/uprate =>  { comment, rating }
 * 
 * Uprates a comment
 *
 *  Comment is { id, comment, rating, user_id, post_id }
 *  Rating is {id, user_id, comment_id, rating}
 *
 * Authorization required: none
 */

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

/** POST /comments/:id/downrate =>  { comment, rating }
 * 
 *  Downrates a comment
 *
 *  Comment is { id, comment, rating, user_id, post_id }
 *  Rating is {id, user_id, comment_id, rating}
 *
 *  Authorization required: none
 */

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

/** POST /comments/:username/:id/save =>  { comment }
 * 
 *  Saves a comment
 *
 *  Comment is { id, comment, rating, user_id, post_id }
 *
 *  Authorization required: correct user
 */

router.post('/:username/:id/save', ensureCorrectUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { user_id } = req.body;
    const savedComment = await SavedComment.save(user_id, id);
    return res.json({ comment: savedComment });
  }
  catch (err) {
    return next(err);
  }
});

/** DELETE /comments/:username/:id/unsave =>  { comment }
 * 
 *  Unsaves a comment
 *
 *  Comment is { id, comment, rating, user_id, post_id }
 *
 *  Authorization required: correct user
 */

router.delete('/:username/:id/unsave', ensureCorrectUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { user_id } = req.body;
    const savedComment = await SavedComment.delete(user_id, id);
    return res.json({ comment: savedComment });
  }
  catch (err) {
    return next(err);
  }
});

/** DELETE /comments/:username/:id =>  { message }
 * 
 *  Deletes a comment
 *
 *  Authorization required: correct user
 */

router.delete('/:username/:id', ensureCorrectUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await Comment.delete(id);
    return res.json({ message });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;