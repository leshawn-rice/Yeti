const db = require('../../db.js');
const { BadRequestError, NotFoundError } = require('../../expressError');
const Post = require('../../models/Post.js');
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./common');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('create', function () {
  const newPost = {
    username: 'U1',
    body: 'test post',
    location: { latitude: 46.7464684, longitude: -117.1817128 }
  };

  test('works', async function () {
    let post = await Post.create(newPost.username, newPost.body, newPost.location);
    expect(post).toEqual({
      id: expect.any(Number),
      body: newPost.body,
      rating: 0,
      latitude: newPost.location.latitude,
      longitude: newPost.location.longitude,
      user_id: expect.any(Number)
    });

    const result = await db.query(
      `SELECT id, body, rating, latitude, longitude, user_id
       FROM posts
       WHERE body = $1`, [newPost.body]);
    expect(result.rows).toEqual([
      {
        id: expect.any(Number),
        body: newPost.body,
        rating: 0,
        latitude: newPost.location.latitude,
        longitude: newPost.location.longitude,
        user_id: expect.any(Number)
      },
    ]);
  });
});

describe('delete', function () {
  const newPost = {
    username: 'U1',
    body: 'test post',
    location: { latitude: 46.7464684, longitude: -117.1817128 }
  };

  test('works', async function () {
    let post = await Post.create(newPost.username, newPost.body, newPost.location);
    await Post.delete(post.id);
    const res = await db.query(`
    SELECT * FROM posts WHERE body=$1
    `, [newPost.body]);
    expect(res.rows.length).toEqual(0);
  });

  test('bad request: no id given', async function () {
    try {
      await Post.delete();
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});


