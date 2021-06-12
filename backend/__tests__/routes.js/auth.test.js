const request = require('supertest');
const app = require('../../app');

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

describe('POST /auth/login', function () {
  test('works', async function () {
    const resp = await request(app)
      .post('/auth/login')
      .send({
        email: 'u1@test.com',
        password: 'testpassword',
      });
    expect(resp.body).toEqual({
      'token': expect.any(String),
      'user': expect.any(Object)
    });
  });

  test('bad request with non-existent user', async function () {
    const resp = await request(app)
      .post('/auth/login')
      .send({
        email: 'no-such-user',
        password: 'testpassword',
      });
    expect(resp.statusCode).toEqual(400);
  });

  test('unauth with wrong password', async function () {
    const resp = await request(app)
      .post('/auth/login')
      .send({
        email: 'u1@test.com',
        password: 'invalid-password',
      });
    expect(resp.statusCode).toEqual(401);
  });

  test('bad request with missing data', async function () {
    const resp = await request(app)
      .post('/auth/login')
      .send({
        email: 'u1@test.com',
      });
    expect(resp.statusCode).toEqual(400);
  });

  test('bad request with invalid data', async function () {
    const resp = await request(app)
      .post('/auth/login')
      .send({
        email: 42,
        password: 'above-is-a-number',
      });
    expect(resp.statusCode).toEqual(400);
  });
});

describe('POST /auth/register', function () {
  test('works for anon', async function () {
    const resp = await request(app)
      .post('/auth/register')
      .send({
        password: 'password',
        email: 'new@email.com',
      });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      'token': expect.any(String),
      'user': expect.any(Object)
    });
  });

  test('bad request with missing fields', async function () {
    const resp = await request(app)
      .post('/auth/register')
      .send({
        email: 'new@new.com',
      });
    expect(resp.statusCode).toEqual(400);
  });
});