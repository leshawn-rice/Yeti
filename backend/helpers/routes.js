const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const PostRating = require('../models/PostRating');
const CommentRating = require('../models/CommentRating');
const SavedPost = require('../models/SavedPost');
const SavedComment = require('../models/SavedComment');


const handlePostUprate = async (postId, userId) => {
  const { rating, wasUprated, wasDownrated } = await PostRating.uprate(userId, postId);
  let post;
  if (wasUprated) {
    post = await Post.downrate(postId);
    await User.downrate(userId);
  }
  else if (wasDownrated) {
    // uprate twice if it was downrated before
    await Post.uprate(postId);
    post = await Post.uprate(postId);
    await User.uprate(userId);
    await User.uprate(userId);
  }
  else {
    post = await Post.uprate(postId);
    await User.uprate(userId);
  }
  return { post, rating };
}

const handlePostDownrate = async (postId, userId) => {
  const { rating, wasUprated, wasDownrated } = await PostRating.downrate(userId, postId);
  let post;
  console.log(wasDownrated);
  if (wasDownrated) {
    post = await Post.uprate(postId);
    await User.uprate(userId);
  }
  else if (wasUprated) {
    // downrate twice if it was uprated before
    await Post.downrate(postId);
    post = await Post.downrate(postId);
    await User.downrate(userId);
    await User.downrate(userId);
  }
  else {
    post = await Post.downrate(postId);
    await User.downrate(userId);
  }
  return { post, rating };
}

const handleCommentUprate = async (commentId, userId) => {
  const { rating, wasUprated, wasDownrated } = await CommentRating.uprate(userId, commentId);
  let comment;
  if (wasUprated) {
    comment = await Comment.downrate(commentId);
    await User.downrate(userId);
  }
  else if (wasDownrated) {
    // uprate twice if it was downrated before
    await Comment.uprate(commentId);
    comment = await Comment.uprate(commentId);
    await User.uprate(userId);
    await User.uprate(userId);
  }
  else {
    comment = await Comment.uprate(commentId);
    await User.uprate(userId);
  }
  return { comment, rating }
}

const handleCommentDownrate = async (commentId, userId) => {
  const { rating, wasUprated, wasDownrated } = await CommentRating.downrate(userId, commentId);
  let comment;
  if (wasDownrated) {
    comment = await Comment.uprate(commentId);
    await User.uprate(userId);
  }
  else if (wasUprated) {
    // downrate twice if it was uprated before
    await Comment.downrate(commentId);
    comment = await Comment.downrate(commentId);
    await User.downrate(userId);
    await User.downrate(userId);
  }
  else {
    comment = await Comment.downrate(commentId);
    await User.downrate(userId);
  }
  return { comment, rating }
}

/**
 * 
 * @param {object} user
 * given a user with an id, username, rating, & confirmed,
 * adds the users' posts, comments, saved & rated items, to the user
 * @returns the user
 */

const getUserData = async (user) => {
  const posts = await Post.getByUserId(user.id);
  const comments = await Comment.getByUserId(user.id);
  const savedPosts = await SavedPost.getByUserId(user.id);
  const savedComments = await SavedComment.getByUserId(user.id);
  const saved = { posts: savedPosts, comments: savedComments };
  const postRatings = await PostRating.getByUserId(user.id);
  const commentRatings = await CommentRating.getByUserId(user.id);
  const ratings = { posts: postRatings, comments: commentRatings }
  user.posts = posts;
  user.comments = comments;
  user.ratings = ratings;
  user.saved = saved;
  return user;
}

module.exports = {
  handlePostUprate,
  handlePostDownrate,
  handleCommentUprate,
  handleCommentDownrate,
  getUserData
}