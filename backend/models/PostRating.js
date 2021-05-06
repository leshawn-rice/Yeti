"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");

class PostRating {
  /**
   * 
   * @returns all the comments in the database
   */

  static async getAll() {
    const result = await db.query(
      `SELECT id, rating, user_id, post_id
      FROM Posts_Ratings`
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
      `SELECT id, rating, user_id, post_id
      FROM Posts_Ratings
      WHERE id=$1`,
      [id]
    );

    if (result.rows.length === 0) throw new NotFoundError('Post Rating Not Found');
    return result.rows[0];
  }

  /**
   * 
   * @param {int} id 
   * @returns any ratings on the post with the given id
   * throws a BadRequestError if no such post exists, or if it
   * doesn't have any ratings
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
      `SELECT id, rating, user_id, post_id
      FROM Posts_Ratings
      WHERE post_id=$1`,
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
      `SELECT id, rating, user_id, post_id
      FROM Posts_Ratings
      WHERE user_id=$1`,
      [id]
    );

    return result.rows;
  }

  static async uprate(user_id, post_id) {
    const user = await db.query(
      `SELECT id
      FROM Users 
      WHERE id=$1`,
      [user_id]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');

    const post = await db.query(
      `SELECT id
      FROM Posts 
      WHERE id=$1`,
      [post_id]
    );

    console.log(post.rows);

    if (!post.rows.length) throw new NotFoundError('Post Not Found');

    // check if post rating exists

    const currentRating = await db.query(
      `SELECT id, user_id, post_id, rating
      FROM Posts_Ratings
      WHERE user_id=$1 AND post_id=$2`,
      [user_id, post_id]
    );

    let ratingValue = 1;

    if (currentRating.rows.length) {
      if (currentRating.rows[0].rating === 1) {
        ratingValue = 0;
      }
      const rating = await db.query(
        `UPDATE Posts_Ratings
        SET rating=$1
        WHERE user_id=$2 AND post_id=$3
        RETURNING id, rating, user_id, post_id`,
        [ratingValue, user_id, post_id]
      );
      return rating.rows[0];
    }


    const rating = await db.query(
      `INSERT INTO Posts_Ratings
      (rating, user_id, post_id)
      VALUES
      ($1, $2, $3)
      RETURNING id, rating, user_id, post_id`,
      [ratingValue, user_id, post_id]
    );

    console.log(rating.rows);

    return rating.rows[0];
  }

  static async downrate(user_id, post_id) {
    const user = await db.query(
      `SELECT id
      FROM Users 
      WHERE id=$1`,
      [user_id]
    );

    if (!user.rows.length) throw new NotFoundError('User Not Found');

    const post = await db.query(
      `SELECT id
      FROM Posts 
      WHERE id=$1`,
      [post_id]
    );

    if (!post.rows.length) throw new NotFoundError('Post Not Found');

    const currentRating = await db.query(
      `SELECT id, user_id, post_id, rating
      FROM Posts_Ratings
      WHERE user_id=$1 AND post_id=$2`,
      [user_id, post_id]
    );

    let ratingValue = -1;

    if (currentRating.rows.length) ratingValue = 0;

    const rating = await db.query(
      `INSERT INTO Posts_Ratings
      (rating, user_id, post_id)
      VALUES
      ($1, $2, $3)
      RETURNING id, rating, user_id, post_id`,
      [ratingValue, user_id, post_id]
    );

    return rating.rows[0];
  }
}

module.exports = PostRating;