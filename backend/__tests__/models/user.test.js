const db = require('../../db.js');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../expressError');
const User = require('../../models/User.js');
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

describe('register', function () {
  const newUser = {
    email: 'new@test.com',
    password: 'newpassword'
  };

  test('works', async function () {
    let user = await User.register(newUser.email, newUser.password);
    expect(user).toEqual({
      id: expect.any(Number),
      email: newUser.email,
      username: expect.any(String),
      rating: 0,
      confirmed: false
    });

    const result = await db.query(
      `SELECT username, email, password, rating, confirmed
       FROM users
       WHERE email = 'new@test.com'`);
    expect(result.rows).toEqual([
      {
        username: expect.any(String),
        email: 'new@test.com',
        password: expect.any(String),
        rating: 0,
        confirmed: false,
      },
    ]);
  });

  test('bad request with dupe', async function () {
    try {
      await User.register(newUser.email, newUser.password);
      await User.register(newUser.email, newUser.password);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

describe('authenticate', function () {
  const newUser = {
    email: 'new@test.com',
    password: 'newpassword'
  };

  test('works', async function () {
    await User.register(newUser.email, newUser.password);

    let user = await User.authenticate(newUser.email, newUser.password);
    expect(user).toEqual({
      id: expect.any(Number),
      email: 'new@test.com',
      username: expect.any(String),
      rating: 0,
      confirmed: false
    });
  });

  test('bad request with invalid password', async function () {
    await User.register(newUser.email, newUser.password);
    try {
      await User.authenticate(newUser.email, 'invalid-password');
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});


