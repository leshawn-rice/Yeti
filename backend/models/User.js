// External dependencies
const bcrypt = require('bcrypt');
// Internal dependencies
const { BCRYPT_WORK_FACTOR } = require('../config');
const db = require('../db');
const { generateUsername } = require('../helpers/user');
// Errors
const { NotFoundError, BadRequestError, UnauthorizedError } = require('../expressError');

class User {

  /**
   * 
   * @param {string} username
   * @returns the comment with the given username,
   * throws an error if no such user exists or no username was passed
   */

  static async getByUsername(username) {
    if (!username) throw new BadRequestError('No Username');

    const user = await db.query(
      `SELECT id, email, username, rating, confirmed 
      FROM Users 
      WHERE username=$1`,
      [username]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');
    return user.rows[0];
  }

  /**
   * 
   * @param {string} email 
   * @param {string} password 
   * 
   * verifies that there exists a user in the database with the given email, and checks the given password 
   * against the one that user has in the database. if this succeeds, returns the user, otherwise throws an
   * error
   */

  static async authenticate(email, password) {
    if (!email || !password) throw new BadRequestError();

    const user = await db.query(
      `SELECT id, email, username, password, rating, confirmed 
      FROM Users 
      WHERE email=$1`,
      [email]
    );

    if (!user.rows.length) throw new BadRequestError('Invalid Email/Password');

    const hashedPassword = user.rows[0].password;

    if (await bcrypt.compare(password, hashedPassword)) {
      const userToReturn = user.rows[0];
      delete userToReturn.password;
      return userToReturn;
    }
    else {
      throw new UnauthorizedError('Invalid Email/Password!');
    }
  }

  /**
   * 
   * @param {string} email 
   * @param {string} password 
   * 
   * Creates a new user with the given email & password, and a random username w/ default rating & confirmed values
   * if the email is already taken or no email/password were passed, throws an error
   */

  static async register(email, password) {
    if (!email || !password) throw new BadRequestError('Email/Password Required!');

    const emailExists = await db.query(
      `SELECT email FROM Users
      WHERE email=$1`,
      [email]
    );

    if (emailExists.rows.length) throw new BadRequestError('Email Taken!')

    const takenUsernames = await db.query(
      `SELECT username FROM Users`
    );

    const username = generateUsername(takenUsernames.rows);
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const user = await db.query(
      `INSERT INTO Users
      (email, username, password)
      VALUES
      ($1, $2, $3)
      RETURNING 
      id, email, username, rating, confirmed`,
      [email, username, hashedPassword]
    );

    return user.rows[0];
  }

  /**
   * 
   * @param {string} username 
   * @param {string} email 
   * 
   * changes the user with the given username's email to the given email
   */

  static async changeEmail(username, email) {
    if (!username || !email) throw new BadRequestError('Invalid Data!');

    const user = await db.query(
      `SELECT id, username, email
      FROM Users
      WHERE username=$1`,
      [username]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found!');

    const duplicateEmail = await db.query(
      `SELECT id, username, email
      FROM Users
      WHERE email=$1`,
      [email]
    );

    if (duplicateEmail.rows.length) throw new BadRequestError('Email Taken!');

    const result = await db.query(
      `UPDATE Users
      SET email=$1
      WHERE username=$2
      RETURNING id, email, username, rating, confirmed`,
      [email, username]
    );

    return result.rows[0];
  }

  /**
   * 
   * @param {string} username 
   * @param {string} oldPassword 
   * @param {string} newPassword 
   * 
   * checks the old password against the password of the user with the given username, 
   * if they match, then updates the user's password to a hash of the new password. Otherwise throws
   * an error
   */

  static async changePassword(username, oldPassword, newPassword) {
    if (!username || !oldPassword || !newPassword) throw new BadRequestError('Invalid Data!');

    const user = await db.query(
      `SELECT id, username, password
      FROM Users
      WHERE username=$1`,
      [username]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found!');

    const hashedPassword = user.rows[0].password;

    if (await bcrypt.compare(oldPassword, hashedPassword)) {
      const newHashedPassword = await bcrypt.hash(newPassword, BCRYPT_WORK_FACTOR);
      const result = await db.query(
        `UPDATE Users
        SET password=$1
        WHERE username=$2
        RETURNING id, email, username, rating, confirmed`,
        [newHashedPassword, username]
      );
      return result.rows[0];
    }
    else {
      throw new BadRequestError('Invalid Password!');
    }

  }

  /**
   * 
   * @param {object} payload 
   * given a payload (decoded token that contains the user's email)
   * updates the user with the given email to confirmed status. Otherwise throws an error
   */

  static async confirmEmail(payload) {
    if (!payload || !payload.email) throw new BadRequestError('Invalid Token!');

    const user = await db.query(
      `UPDATE Users
      SET confirmed=TRUE
      WHERE email=$1
      RETURNING id, email, username, rating, confirmed`,
      [payload.email]
    );

    if (!user.rows.length) throw new BadRequestError('User does not exist!');

    return user.rows[0];
  }

  /**
   * 
   * @param {int} id 
   * @returns the user with the given id,
   * throws an error if no such comment exists or no id was passed
   */

  static async getById(id) {
    if (!id) throw new BadRequestError();

    const user = await db.query(
      `SELECT id, email, username, rating, confirmed 
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');

    return user.rows[0];
  }

  /**
  * 
  * @param {int} id
  * 
  * given the id of a user, if the user exists, increments the user's rating by 1, and returns the
  * updated user, otherwise throws a NotFoundError
  * 
  */

  static async uprate(id) {
    if (!id) throw new BadRequestError();

    const user = await db.query(
      `SELECT id, email, username, rating, confirmed 
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');

    const result = await db.query(
      `UPDATE Users
      SET rating=$1
      WHERE id=$2
      RETURNING id, email, username, rating, confirmed`,
      [user.rows[0].rating + 1, id]
    );

    return result.rows[0];
  }

  /**
  * 
  * @param {int} id
  * 
  * given the id of a user, if the user exists, decrements the user's rating by 1, and returns the
  * updated user, otherwise throws a NotFoundError
  * 
  */

  static async downrate(id) {
    if (!id) throw new BadRequestError();

    const user = await db.query(
      `SELECT id, email, username, rating, confirmed 
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');

    const result = await db.query(
      `UPDATE Users
      SET rating=$1
      WHERE id=$2
      RETURNING id, email, username, rating, confirmed`,
      [user.rows[0].rating - 1, id]
    );

    return result.rows[0];
  }

  /**
   * 
   * @param {int} id 
   * deletes the user with the given ID from the db and returns a message
   * 'user deleted'
   */

  static async delete(username) {
    if (!username) throw new BadRequestError();
    await db.query(
      `DELETE FROM Users
      WHERE username=$1`,
      [username]
    );

    return { message: 'User Deleted' }
  }

}

module.exports = User;