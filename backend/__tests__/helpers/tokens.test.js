const jwt = require("jsonwebtoken");
const { createToken } = require("../helpers/tokens");
const { SECRET_KEY } = require('../../config');

describe("createToken", function () {
  test("works: user", function () {
    const token = createToken({ username: 'test', email: 'test@test.com', rating: 0 });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: 'test',
      email: 'test@test.com',
      rating: 0
    });
  });

  // test("works: admin", function () {
  //   const token = createToken({ username: "test", isAdmin: true });
  //   const payload = jwt.verify(token, SECRET_KEY);
  //   expect(payload).toEqual({
  //     iat: expect.any(Number),
  //     username: "test",
  //     isAdmin: true,
  //   });
  // });

  // test("works: default no admin", function () {
  //   // given the security risk if this didn't work, checking this specifically
  //   const token = createToken({ username: "test" });
  //   const payload = jwt.verify(token, SECRET_KEY);
  //   expect(payload).toEqual({
  //     iat: expect.any(Number),
  //     username: "test",
  //     isAdmin: false,
  //   });
  // });
});