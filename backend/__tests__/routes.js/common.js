const db = require('../../db.js');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const locations = [
  { lat: 46.7368046, lon: -116.7693401, },
  { lat: 46.9675537, lon: -119.0395658 },
  { lat: 47.6571934, lon: -117.4235106 }
];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM posts');
  await db.query('DELETE FROM comments');
  await db.query('DELETE FROM posts_ratings');
  await db.query('DELETE FROM comments_ratings');
  await db.query('DELETE FROM saved_posts');
  await db.query('DELETE FROM saved_comments');

  const u1 = await User.register('u1@test.com', 'testpassword');
  const u2 = await User.register('u2@test.com', 'testpassword');
  const u3 = await User.register('u3@test.com', 'testpassword');
  const users = [u1, u2, u3];

  const p1 = await Post.create(users[0].username, 'test post 1', locations[0]);
  const p2 = await Post.create(users[1].username, 'test post 2', locations[1]);
  const p3 = await Post.create(users[2].username, 'test post 3', locations[2]);
  const posts = [p1, p2, p3];

  await Comment.create(users[0].username, 'test comment 1', posts[0].id);
  await Comment.create(users[1].username, 'test comment 2', posts[0].id);
  await Comment.create(users[2].username, 'test comment 3', posts[1].id);
}

async function commonBeforeEach() {
  await db.query('BEGIN');
}

async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};