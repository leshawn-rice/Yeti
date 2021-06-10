const { getUserData } = require('../../helpers/routes');
const db = require('../../db');

afterAll(() => {
  db.end
})

describe('getUserData', () => {
  test('works: valid user', async (done) => {
    const u = {
      id: 5, email: 'test5@test.com', username: 'test5', password: 'testpassword', rating: 500, confirmed: true
    }
    const user = await getUserData(u);
    // Test User #5 should have 2 posts, and 0 comments/rated posts/saved posts
    expect(user.posts.length).toEqual(2);
    expect(user.comments.length).toEqual(0);
    expect(user.ratings.posts.length).toEqual(0);
    expect(user.ratings.comments.length).toEqual(0);
    expect(user.saved.posts.length).toEqual(0);
    expect(user.saved.comments.length).toEqual(0);
    done();
  });
});