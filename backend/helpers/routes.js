const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const PostRating = require('../models/PostRating');
const CommentRating = require('../models/CommentRating');


// Update user rating on each of these

const handlePostUprate = async (postId, userId) => {
  const { rating, wasUprated, wasDownrated } = await PostRating.uprate(userId, postId);
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
  return { post, rating };
}

const handlePostDownrate = async (postId, userId) => {
  const { rating, wasUprated, wasDownrated } = await PostRating.downrate(userId, postId);
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
  return { post, rating };
}

const handleCommentUprate = async (commentId, userId) => {
  const { rating, wasUprated, wasDownrated } = await CommentRating.uprate(userId, commentId);
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
  return { comment, rating }
}

const handleCommentDownrate = async (commentId, userId) => {
  const { rating, wasUprated, wasDownrated } = await CommentRating.downrate(userId, commentId);
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
  return { comment, rating }
}

module.exports = {
  handlePostUprate,
  handlePostDownrate,
  handleCommentUprate,
  handleCommentDownrate
}