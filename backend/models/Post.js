"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { calculateDistance } = require('../helpers/locater');
const { MAX_RADIAL_DISTANCE } = require('../config');

class Post {

  /**
   * 
   * @returns all the posts in the database
   */

  static async getAll() {
    const result = await db.query(
      `SELECT id, body, rating, latitude, longitude, user_id
      FROM Posts`
    );
    return result.rows;
  }

  /**
   * 
   * @param {float} lat 
   * @param {float} long 
   * @param {float} distance (mi)
   * @returns all the posts that are within "distance" miles of the given latitude & longitude.
   */

  static async getByLocation(lat, long, dist = 5) {
    if (!lat || !long) throw new BadRequestError('Error Retrieving Location!');

    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    const distance = parseFloat(dist);

    //  This query gets all the posts that are located within 2.5 of the current lat/long
    //  This is to quickly filter out any posts more than ~150 mi away before precise filtering occurs
    //  because the max distance is 100mi
    const result = await db.query(
      `SELECT id, body, rating, latitude, longitude, user_id
      FROM Posts
      WHERE latitude BETWEEN $1 AND $2
      AND longitude BETWEEN $3 AND $4`,
      [
        latitude - MAX_RADIAL_DISTANCE,
        latitude + MAX_RADIAL_DISTANCE,
        longitude - MAX_RADIAL_DISTANCE,
        longitude + MAX_RADIAL_DISTANCE]
    );

    const posts = result.rows.filter((row) => {
      const postDistance = calculateDistance([latitude, longitude], [row.latitude, row.longitude]);
      if (postDistance < distance) return true;
      return false;
    });

    return posts;
  }

  /**
   * 
   * @param {int} id 
   * @returns the post with the given id,
   * throws a BadRequestError if no such post exists
   */

  static async getById(id) {
    if (!id) throw new BadRequestError();

    const result = await db.query(
      `SELECT id, body, rating, latitude, longitude, user_id
      FROM Posts
      WHERE id=$1`,
      [id]
    );

    if (!result.rows.length) throw new NotFoundError('Post Not Found');
    return result.rows[0];
  }

  /**
   * 
   * @param {int} id 
   * @returns any posts by the user with the given id
   * throws a BadRequestError if no such user exists, or if they
   * don't have any posts
   */

  static async getByUserId(id) {
    if (!id) throw new BadRequestError();

    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (!userResult.rows.length) throw new NotFoundError('User Not Found');

    const result = await db.query(
      `SELECT id, body, rating, latitude, longitude, user_id
      FROM Posts
      WHERE user_id=$1`,
      [id]
    );

    return result.rows;
  }

  /**
   * 
   * @param {int} id
   * 
   * given the id of a post, if the post exists, increments the post's rating by 1, and returns the
   * updated post, otherwise throws a NotFoundError
   * 
   */

  static async uprate(id) {
    if (!id) throw new BadRequestError();

    const post = await db.query(
      `SELECT id, rating
      FROM Posts 
      WHERE id=$1`,
      [id]
    );

    if (!post.rows.length) throw new NotFoundError('Post Not Found');

    const newRating = post.rows[0].rating + 1;

    const newPost = await db.query(
      `UPDATE Posts
      SET rating=$1
      WHERE id=$2
      RETURNING id, body, rating, user_id`,
      [newRating, id]
    );

    return newPost.rows[0];
  }

  /**
* 
* @param {int} id
* 
* given the id of a post, if the post exists, decrements the post's rating by 1, and returns the
* updated post, otherwise throws a NotFoundError
* 
*/

  static async downrate(id) {
    if (!id) throw new BadRequestError();

    const post = await db.query(
      `SELECT id, rating
      FROM Posts 
      WHERE id=$1`,
      [id]
    );

    if (!post.rows.length) throw new NotFoundError('Post Not Found');

    const newRating = post.rows[0].rating - 1;

    const newPost = await db.query(
      `UPDATE Posts
      SET rating=$1
      WHERE id=$2
      RETURNING id, body, rating, user_id`,
      [newRating, id]
    );

    return newPost.rows[0];
  }

  /**
   * 
   * @param {string} username 
   * @param {string} body 
   * @param {object} location 
   * 
   * given a username, a post body, and a location, checks if the user with the given username exists,
   * and if so creates a new post with the body
   * column containing the value held in the "body" parameter.
   * 
   * @returns the new post or throws an error if invalid data was passed
   */

  static async create(username, body, location) {
    if (!body) throw new BadRequestError('Post cannot be blank!');
    if (!username || !location) throw new BadRequestError('Error! Username/Location invalid!');

    const latitude = parseFloat(location.latitude);
    const longitude = parseFloat(location.longitude);

    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE username=$1`,
      [username]
    );

    if (!userResult.rows.length) throw new NotFoundError('User Not Found');
    const user_id = userResult.rows[0].id;

    const post = await db.query(
      `INSERT INTO Posts
      (body, latitude, longitude, user_id)
      VALUES
      ($1, $2, $3, $4)
      RETURNING
      id, body, rating, latitude, longitude, user_id `,
      [body, latitude, longitude, user_id]
    );

    return post.rows[0];
  }

  /**
  * 
  * @param {int} id 
  * deletes the post with the given ID from the db and returns a message
  * 'post deleted'
  */

  static async delete(id) {
    if (!id) throw new BadRequestError();

    await db.query(
      `DELETE FROM Posts
      WHERE id=$1`,
      [id]
    );

    return { message: 'Post Deleted' }
  }
}

module.exports = Post;