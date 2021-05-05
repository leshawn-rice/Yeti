"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Comment {
  /**
   * 
   * @returns all the comments in the database
   */

  static async getAll() {
    const result = await db.query(
      `SELECT id, comment, rating, user_id, post_id
      FROM Comments`
    );
    return result.rows;
  }

  /**
   * 
   * @param {int} id 
   * @returns the comment with the given id,
   * throws a BadRequestError if no such comment exists
   */

  static async getById(id) {
    const result = await db.query(
      `SELECT id, comment, rating, user_id, post_id
      FROM Comments
      WHERE id=$1`,
      [id]
    );

    if (result.rows.length === 0) throw new NotFoundError('Post Not Found');
    return result.rows[0];
  }

  /**
   * 
   * @param {int} id 
   * @returns any comments on the post with the given id
   * throws a BadRequestError if no such post exists, or if it
   * doesn't have any comments
   */

  static async getByPostId(id) {
    const postResult = await db.query(
      `SELECT id, body 
      FROM Posts 
      WHERE id=$1`,
      [id]
    );

    if (postResult.rows.length === 0) throw NotFoundError('Post Not Found');

    const result = await db.query(
      `SELECT id, comment, rating, user_id, post_id
      FROM Comments
      WHERE post_id=$1`,
      [id]
    );

    return result.rows;
  }

  /**
   * 
   * @param {int} id 
   * @returns any comments by the user with the given id
   * throws a BadRequestError if no such user exists, or if they
   * don't have any comments
   */

  static async getByUserId(id) {

    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (userResult.rows.length === 0) throw NotFoundError('User Not Found');

    const result = await db.query(
      `SELECT id, comment, rating, user_id, post_id
      FROM Comments
      WHERE user_id=$1`,
      [id]
    );

    return result.rows;
  }

  static async create(username, body, post_id) {
    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE username=$1`,
      [username]
    );

    if (userResult.rows.length === 0) throw new NotFoundError('User Not Found');

    const user_id = userResult.rows[0].id;

    const comment = await db.query(
      `INSERT INTO Comments
      (comment, user_id, post_id)
      VALUES
      ($1, $2, $3)
      RETURNING
      id, comment, user_id, post_id `,
      [body, user_id, post_id]
    );

    if (!comment.rows[0]) throw new BadRequestError();

    return comment.rows[0];
  }
}

module.exports = Comment;