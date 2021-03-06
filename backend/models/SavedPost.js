const db = require("../db");
const { BadRequestError } = require("../expressError");

class SavedPost {
  /**
   * 
   * @param {int} id 
   * @returns any posts saved by the user with the given id
   * throws a BadRequestError if no such user exists, or if they
   * don't have any posts saved
   */

  static async getByUserId(id) {

    if (!id) throw new BadRequestError();

    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (userResult.rows.length === 0) throw new NotFoundError('User Not Found');

    const result = await db.query(
      `SELECT id, user_id, post_id
      FROM Saved_Posts
      WHERE user_id=$1`,
      [id]
    );

    return result.rows;
  }

  /**
   * 
   * @param {int} user_id 
   * @param {int} post_id 
   * deletes the saved_post entry with the given IDs from the db and returns null
   */


  static async delete(user_id, post_id) {
    if (!user_id || !post_id) throw new BadRequestError();

    const result = await db.query(
      `DELETE FROM Saved_Posts
        WHERE user_id=$1 AND post_id=$2`,
      [user_id, post_id]
    );

    return result.rows[0];
  }

  /**
   * 
   * @param {int} user_id 
   * @param {int} post_id 
   * checks if the user/post with the given IDs exist, and if so checks if a duplicate entry already exists,
   * if it doesn't creates a new saved_post entry with the given user_id & post_id.
   * if any of the checks fail, throws an error
   */

  static async save(user_id, post_id) {
    if (!user_id || !post_id) throw new BadRequestError();

    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE id=$1`,
      [user_id]
    );

    if (!userResult.rows.length) throw new NotFoundError('User Not Found');

    const commentResult = await db.query(
      `SELECT id, body 
      FROM Posts 
      WHERE id=$1`,
      [post_id]
    );

    if (!commentResult.rows.length) throw new NotFoundError('Post Not Found');

    const duplicateResult = await db.query(
      `SELECT id, user_id, post_id
      FROM Saved_Posts
      WHERE user_id=$1 AND post_id=$2`,
      [user_id, post_id]
    );

    if (duplicateResult.rows.length) return duplicateResult.rows[0];

    const result = await db.query(
      `INSERT INTO Saved_Posts
      (user_id, post_id)
      VALUES
      ($1,$2)
      RETURNING id, user_id, post_id`,
      [user_id, post_id]
    );

    return result.rows[0];
  }
}

module.exports = SavedPost;