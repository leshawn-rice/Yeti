const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const { createUserToken, createEmailToken, decodeToken, verifyToken } = require('../../helpers/tokens');

describe('createUserToken', () => {
  test('works: valid user', () => {
    const token = createUserToken({ id: 1, username: 'testuser', email: 'test@test.com', rating: 1 });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: 'testuser',
      email: 'test@test.com',
      rating: 1
    });
  });

  test('works: empty user', () => {
    const token = createUserToken({ id: 1 });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
    })
  });
});

describe('createEmailToken', () => {
  test('works: valid email', () => {
    const token = createEmailToken('test@test.com');
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      email: 'test@test.com'
    });
  })
});

describe('verifyToken', () => {
  test('works: valid token', () => {
    const token = jwt.sign({ name: 'test' }, SECRET_KEY);
    const isVerified = verifyToken(token);
    expect(isVerified).toBe(true);
  });
  test('fails: invalid token', () => {
    const token = jwt.sign({ name: 'test' }, 'random_key_321');
    const isVerified = verifyToken(token);
    expect(isVerified).toBe(false);
  });
});

describe('decodeToken', () => {
  test('works: valid token', () => {
    const token = jwt.sign({ name: 'test' }, SECRET_KEY);
    const payload = decodeToken(token);
    expect(payload).toEqual({ iat: expect.any(Number), name: 'test' });
  });
});