"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");

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
    if (!id) throw new BadRequestError();

    const result = await db.query(
      `SELECT id, comment, rating, user_id, post_id
      FROM Comments
      WHERE id=$1`,
      [id]
    );

    if (!result.rows.length) throw new NotFoundError('Comment Not Found');
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
    if (!id) throw new BadRequestError();

    const postResult = await db.query(
      `SELECT id, body 
      FROM Posts 
      WHERE id=$1`,
      [id]
    );

    if (!postResult.rows.length) throw NotFoundError('Post Not Found');

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
    if (!id) throw new BadRequestError();

    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (!userResult.rows.length) throw NotFoundError('User Not Found');

    const result = await db.query(
      `SELECT id, comment, rating, user_id, post_id
      FROM Comments
      WHERE user_id=$1`,
      [id]
    );

    return result.rows;
  }

  static async uprate(id) {
    if (!id) throw new BadRequestError();

    const comment = await db.query(
      `SELECT id, rating
      FROM Comments 
      WHERE id=$1`,
      [id]
    );

    if (!comment.rows.length) throw new NotFoundError('Comment Not Found');

    const newRating = comment.rows[0].rating + 1;

    const newComment = await db.query(
      `UPDATE Comments
      SET rating=$1
      WHERE ID=$2
      RETURNING id, comment, rating, user_id, post_id`,
      [newRating, id]
    );

    return newComment.rows[0];
  }

  static async downrate(id) {
    if (!id) throw new BadRequestError();

    const comment = await db.query(
      `SELECT id, rating
      FROM Comments 
      WHERE id=$1`,
      [id]
    );

    if (!comment.rows.length) throw new NotFoundError('Comment Not Found');

    const newRating = comment.rows[0].rating - 1;

    const newComment = await db.query(
      `UPDATE Comments
      SET rating=$1
      WHERE ID=$2
      RETURNING id, comment, rating, user_id, post_id`,
      [newRating, id]
    );

    return newComment.rows[0];
  }

  static async create(username, comment, post_id) {
    if (!username) throw new UnauthorizedError('You need to be logged in to comment!');
    if (!comment) throw new BadRequestError('You need to write something to comment!')
    if (!post_id) throw new BadRequestError('Invalid Post!');

    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE username=$1`,
      [username]
    );

    if (!userResult.rows.length) throw new NotFoundError('User Not Found');

    const postResult = await db.query(
      `SELECT id, body 
      FROM Posts 
      WHERE id=$1`,
      [post_id]
    );

    if (!postResult.rows.length) throw new NotFoundError('Post Not Found');

    const user_id = userResult.rows[0].id;

    const result = await db.query(
      `INSERT INTO Comments
      (comment, user_id, post_id)
      VALUES
      ($1, $2, $3)
      RETURNING
      id, comment, rating, user_id, post_id `,
      [comment, user_id, post_id]
    );

    return result.rows[0];
  }

  static async delete(id) {
    if (!id) throw new BadRequestError();

    await db.query(
      `DELETE FROM Comments
      WHERE id=$1`,
      [id]
    );

    return { message: 'Comment Deleted' }
  }
}

module.exports = Comment;