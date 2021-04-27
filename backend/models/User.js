// External dependencies
const bcrypt = require('bcrypt');
// Internal dependencies
const { BCRYPT_WORK_FACTOR } = require('../config');
const db = require('../db');
const { generateUsername } = require('../helpers/user');
// Errors
const { NotFoundError, BadRequestError } = require('../expressError');

class User {
  static async authenticate(email, password) {
    const user = await db.query(
      `SELECT id, email, username, password, rating, confirmed 
      FROM Users 
      WHERE email=$1`,
      [email]
    );

    if (!user.rows[0]) throw new NotFoundError('User Not Found');

    const hashedPassword = user.rows[0].password;

    if (await bcrypt.compare(password, hashedPassword)) {
      const userToReturn = user.rows[0];
      delete userToReturn.password;
      return userToReturn;
    }
    else {
      throw new BadRequestError('Invalid Email/Password!');
    }
  }

  static async register(email, password) {

    const emailExists = await db.query(
      `SELECT email FROM Users
      WHERE email=$1`,
      [email]
    );

    if (emailExists.rows.length > 0) throw new BadRequestError('Email Taken')

    const takenUsernames = await db.query(
      `SELECT username FROM Users`
    );

    const username = generateUsername(takenUsernames.rows);
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    console.log(hashedPassword);

    const user = await db.query(
      `INSERT INTO Users
      (email, username, password)
      VALUES
      ($1, $2, $3)
      RETURNING 
      id, email, username, rating, confirmed`,
      [email, username, hashedPassword]
    );

    if (!user.rows[0]) throw new BadRequestError();

    return user.rows[0];
  }

  static async confirmEmail(payload) {
    const user = await db.query(
      `UPDATE Users
      SET confirmed=TRUE
      WHERE email=$1
      RETURNING id, email, username, rating, confirmed`,
      [payload.email]
    );

    if (!user.rows[0]) throw new BadRequestError('User does not exist!');

    return user.rows[0];
  }

  static async delete(username) {
    await db.query(
      `DELETE FROM Users
      WHERE username=$1`,
      [username]
    );

    return { message: 'User Deleted' }
  }

}

module.exports = User;