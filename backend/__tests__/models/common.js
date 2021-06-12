const bcrypt = require('bcrypt');

const db = require('../../db.js');
const { BCRYPT_WORK_FACTOR } = require('../../config');

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query('DELETE FROM users');
  await db.query('DELETE FROM posts');
  await db.query('DELETE FROM comments');
  await db.query('DELETE FROM posts_ratings');
  await db.query('DELETE FROM comments_ratings');
  await db.query('DELETE FROM saved_posts');
  await db.query('DELETE FROM saved_comments');

  const password = await bcrypt.hash('testpassword', BCRYPT_WORK_FACTOR);

  const users = await db.query(`
    INSERT INTO users(email, username, password, rating, confirmed)
    VALUES ('u1@test.com', 'U1', $1, 1, true),
           ('u2@test.com', 'U2', $2, 2, true),
           ('u3@test.com', 'U3', $3, 3, false)
    RETURNING id
  `,
    [password, password, password]);



  const posts = await db.query(`
    INSERT INTO posts (body, rating, latitude, longitude, user_id)
    VALUES ('Post1', 100, 46.7368046,-116.7693401, $1),
           ('Post2', 200, 46.9675537,-119.0395658, $1),
           ('Post3', 300, 47.6571934, -117.4235106, $2),
           ('Post4', 0, 46.776512, -117.369357, $3)
    RETURNING id
    `,
    [users.rows[0].id, users.rows[1].id, users.rows[2].id]);

  await db.query(`
  INSERT INTO comments(comment, rating, user_id, post_id)
  VALUES ('Comment1', 10, $1, $2),
         ('Comment2', 20, $3, $4)
  `,
    [users.rows[0].id, posts.rows[0].id, users.rows[1].id, posts.rows[1].id]);
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