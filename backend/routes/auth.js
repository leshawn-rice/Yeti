// External Dependencies
const express = require('express');
// Internal Dependencies
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { createUserToken, decodeToken, verifyToken } = require('../helpers/tokens');
const { sendEmail, createConfirmationEmail } = require('../helpers/email');
const PostRating = require('../models/PostRating');
const CommentRating = require('../models/CommentRating');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.register(email, password);
    const posts = await Post.getByUserId(user.id);
    const comments = await Comment.getByUserId(user.id);
    const postRatings = await PostRating.getByUserId(user.id);
    const commentRatings = await CommentRating.getByUserId(user.id);
    const ratings = { posts: postRatings, comments: commentRatings }
    console.log(ratings);
    user.posts = posts;
    user.comments = comments;
    user.ratings = ratings;
    const token = createUserToken(user);
    const emailOptions = createConfirmationEmail(email);
    sendEmail(emailOptions);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const posts = await Post.getByUserId(user.id);
    const comments = await Comment.getByUserId(user.id);
    const postRatings = await PostRating.getByUserId(user.id);
    const commentRatings = await CommentRating.getByUserId(user.id);
    const ratings = { posts: postRatings, comments: commentRatings }
    console.log(ratings);
    user.posts = posts;
    user.comments = comments;
    user.ratings = ratings;
    const token = createUserToken(user);
    return res.json({ token, user });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/resend-confirmation-email', async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailOptions = createConfirmationEmail(email);
    sendEmail(emailOptions);
    return (res.json({ message: 'Sent!' }));
  }
  catch (err) {
    return next(err);
  }
});


router.post('/confirm-email', async (req, res, next) => {
  try {
    const { emailToken } = req.body;
    const isTokenValid = verifyToken(emailToken);
    console.log(isTokenValid);
    const decodedToken = decodeToken(emailToken);
    const user = await User.confirmEmail(decodedToken);
    const posts = await Post.getByUserId(user.id);
    const comments = await Comment.getByUserId(user.id);
    const postRatings = await PostRating.getByUserId(user.id);
    const commentRatings = await CommentRating.getByUserId(user.id);
    const ratings = { posts: postRatings, comments: commentRatings }
    user.posts = posts;
    user.comments = comments;
    user.ratings = ratings;
    const userToken = createUserToken(user);
    return res.json({ token: userToken, user });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;