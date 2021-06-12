const { getUserData } = require('../../helpers/routes');
const db = require('../../db');

let u;

beforeAll(async () => {
  const userData = await db.query(`
    INSERT INTO Users (email, username, password)
    VALUES ('getUserTest@test.com', 'getUserTest', 'testpassword')
    RETURNING id, email, username, password, rating, confirmed
  `);
  u = userData.rows[0];
});

afterAll(() => {
  db.end();
})

describe('getUserData', () => {
  test('works: valid user', async (done) => {
    const user = await getUserData(u);
    // Test User #5 should have 2 posts, and 0 comments/rated posts/saved posts
    expect(user.posts.length).toEqual(0);
    expect(user.comments.length).toEqual(0);
    expect(user.ratings.posts.length).toEqual(0);
    expect(user.ratings.comments.length).toEqual(0);
    expect(user.saved.posts.length).toEqual(0);
    expect(user.saved.comments.length).toEqual(0);
    done();
  });
});