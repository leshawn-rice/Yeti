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
      `SELECT email, password FROM Users WHERE email=$1`,
      [email]
    );

    if (!userExists.rows[0]) throw new NotFoundError('User Not Found');

    const hashedPassword = user.rows[0].password;

    if (bcrypt.compare(password, hashedPassword)) {
      return user.rows[0];
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
      email, username, rating`,
      [email, username, hashedPassword]
    );

    if (!user.rows[0]) throw new BadRequestError();

    return user.rows[0];
  }



}

module.exports = User;