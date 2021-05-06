"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");

class CommentRating {
  /**
   * 
   * @returns all the comments in the database
   */

  static async getAll() {
    const result = await db.query(
      `SELECT id, rating, user_id, comment_id
      FROM Comments_Ratings`
    );
    return result.rows;
  }

  /**
   * 
   * @param {int} id 
   * @returns the post rating with the given id,
   * throws a BadRequestError if no such comment exists
   */

  static async getById(id) {
    const result = await db.query(
      `SELECT id, rating, user_id, comment_id
      FROM Comments_Ratings
      WHERE id=$1`,
      [id]
    );

    if (result.rows.length === 0) throw new NotFoundError('Comment Rating Not Found');
    return result.rows[0];
  }

  /**
   * 
   * @param {int} id 
   * @returns any ratings on the post with the given id
   * throws a BadRequestError if no such post exists, or if it
   * doesn't have any ratings
   */

  static async getByCommentId(id) {
    const commentResult = await db.query(
      `SELECT id, body 
      FROM Comments 
      WHERE id=$1`,
      [id]
    );

    if (commentResult.rows.length === 0) throw NotFoundError('Comment Not Found');

    const result = await db.query(
      `SELECT id, rating, user_id, comment_id
      FROM Comments_Ratings
      WHERE comment_id=$1`,
      [id]
    );

    return result.rows;
  }

  /**
   * 
   * @param {int} id 
   * @returns any ratings by the user with the given id
   * throws a BadRequestError if no such user exists, or if they
   * don't have any ratings
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
      `SELECT id, rating, user_id, comment_id
      FROM Comments_Ratings
      WHERE user_id=$1`,
      [id]
    );

    return result.rows;
  }

  static async uprate(user_id, comment_id) {
    const user = await db.query(
      `SELECT id
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');

    const comment = await db.query(
      `SELECT id
      FROM Comments 
      WHERE id=$1`,
      [id]
    );

    if (!comment.rows.length) throw new NotFoundError('Comment Not Found');

    const currentRating = await db.query(
      `SELECT id, user_id, comment_id, rating
      FROM Comments_Ratings
      WHERE user_id=$1 AND comment_id=$2`,
      [user_id, comment_id]
    );

    let ratingValue = 1;

    if (currentRating.rows.length) {
      if (currentRating.rows[0].rating === 1) {
        ratingValue = 0;
      }
      const rating = await db.query(
        `UPDATE Comments_Ratings
        SET rating=$1
        WHERE user_id=$2 AND comment_id=$3
        RETURNING id, rating, user_id, comment_id`,
        [ratingValue, user_id, comment_id]
      );
      return rating.rows[0];
    }

    const rating = await db.query(
      `INSERT INTO Comments_Ratings
      (rating, user_id, comment_id)
      VALUES
      ($1, $2, $3)
      RETURNING id, rating, user_id, comment_id`,
      [1, user_id, comment_id]
    );

    return rating.rows[0];
  }

  static async downrate(id) {
    const user = await db.query(
      `SELECT id
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');

    const comment = await db.query(
      `SELECT id
      FROM Comments
      WHERE id=$1`,
      [id]
    );

    if (!comment.rows.length) throw new NotFoundError('Comment Not Found');

    const currentRating = await db.query(
      `SELECT id, user_id, comment_id, rating
      FROM Comments_Ratings
      WHERE user_id=$1 AND comment_id=$2`,
      [user_id, comment_id]
    );

    let ratingValue = -1;

    if (currentRating.rows.length) {
      if (currentRating.rows[0].rating === -1) {
        ratingValue = 0;
      }
      const rating = await db.query(
        `UPDATE Comments_Ratings
        SET rating=$1
        WHERE user_id=$2 AND comment_id=$3
        RETURNING id, rating, user_id, comment_id`,
        [ratingValue, user_id, comment_id]
      );
      return rating.rows[0];
    }

    const rating = await db.query(
      `INSERT INTO Comments_Ratings
      (rating, user_id, comment_id)
      VALUES
      ($1, $2, $3)
      RETURNING id, rating, user_id, comment_id`,
      [-1, user_id, comment_id]
    );

    return rating.rows[0];
  }
}

module.exports = CommentRating;