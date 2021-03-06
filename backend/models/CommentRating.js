"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const { checkLastRating } = require("../helpers/models");

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
    if (!id) throw new BadRequestError();

    const result = await db.query(
      `SELECT id, rating, user_id, comment_id
      FROM Comments_Ratings
      WHERE id=$1`,
      [id]
    );

    if (!result.rows.length) throw new NotFoundError('Comment Rating Not Found');
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
    if (!id) throw new BadRequestError();

    const commentResult = await db.query(
      `SELECT id, body 
      FROM Comments 
      WHERE id=$1`,
      [id]
    );

    if (!commentResult.rows.length) throw NotFoundError('Comment Not Found');

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
    if (!id) throw new BadRequestError();

    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (!userResult.rows.length) throw NotFoundError('User Not Found');

    const result = await db.query(
      `SELECT id, rating, user_id, comment_id
      FROM Comments_Ratings
      WHERE user_id=$1`,
      [id]
    );

    return result.rows;
  }

  /**
   * 
   * @param {int} user_id 
   * @param {int} comment_id 
   * 
   * given a user id and comment id, creates a new comment_ratings row with the parameters as values for 
   * the corresponding columns, and a rating of 1. if the user_id or comment_id are invalid, throws an error
   */

  static async uprate(user_id, comment_id) {
    if (!user_id || !comment_id) throw new BadRequestError();

    const user = await db.query(
      `SELECT id
      FROM Users 
      WHERE id=$1`,
      [user_id]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');

    const comment = await db.query(
      `SELECT id
      FROM Comments 
      WHERE id=$1`,
      [comment_id]
    );

    if (!comment.rows.length) throw new NotFoundError('Comment Not Found');

    const currentRating = await db.query(
      `SELECT id, user_id, comment_id, rating
      FROM Comments_Ratings
      WHERE user_id=$1 AND comment_id=$2`,
      [user_id, comment_id]
    );

    const { wasUprated, wasDownrated } = checkLastRating(currentRating);

    if (currentRating.rows.length) {
      await db.query(
        `DELETE FROM Comments_Ratings
        WHERE user_id=$1 AND comment_id=$2`,
        [user_id, comment_id]
      );
    }

    if (!wasUprated) {
      const rating = await db.query(
        `INSERT INTO Comments_Ratings
        (rating, user_id, comment_id)
        VALUES
        ($1, $2, $3)
        RETURNING id, rating, user_id, comment_id`,
        [1, user_id, comment_id]
      );
      return { rating: rating.rows[0], wasUprated, wasDownrated };
    }
    else {
      return { rating: { id: 0, user_id, comment_id, rating: 0 }, wasUprated, wasDownrated }
    }
  }

  /**
 * 
 * @param {int} user_id 
 * @param {int} comment_id 
 * 
 * given a user id and comment id, creates a new comment_ratings row with the parameters as values for 
 * the corresponding columns, and a rating of -1. if the user_id or comment_id are invalid, throws an error
 */

  static async downrate(user_id, comment_id) {
    if (!user_id || !comment_id) throw new BadRequestError();

    const user = await db.query(
      `SELECT id
      FROM Users 
      WHERE id=$1`,
      [user_id]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');

    const comment = await db.query(
      `SELECT id
      FROM Comments
      WHERE id=$1`,
      [comment_id]
    );

    if (!comment.rows.length) throw new NotFoundError('Comment Not Found');

    const currentRating = await db.query(
      `SELECT id, user_id, comment_id, rating
      FROM Comments_Ratings
      WHERE user_id=$1 AND comment_id=$2`,
      [user_id, comment_id]
    );

    const { wasUprated, wasDownrated } = checkLastRating(currentRating);

    if (currentRating.rows.length) {
      await db.query(
        `DELETE FROM Comments_Ratings
        WHERE user_id=$1 AND comment_id=$2`,
        [user_id, comment_id]
      );
    }

    if (!wasDownrated) {
      const rating = await db.query(
        `INSERT INTO Comments_Ratings
        (rating, user_id, comment_id)
        VALUES
        ($1, $2, $3)
        RETURNING id, rating, user_id, comment_id`,
        [-1, user_id, comment_id]
      );
      return { rating: rating.rows[0], wasUprated, wasDownrated };
    }
    else {
      return { rating: { id: 0, user_id, comment_id, rating: 0 }, wasUprated, wasDownrated }
    }
  }
}

module.exports = CommentRating;