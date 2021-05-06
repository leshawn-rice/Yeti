"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { calculateDistance } = require('../helpers/locater');

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

  static async getByLocation(lat, long, dist = null) {

    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    let distance = parseFloat(dist);

    //  This query gets all the posts that are located within 2.5 of the current lat/long
    //  This is to quickly filter out any posts more than ~150 mi away before precise filtering occurs
    const result = await db.query(
      `SELECT id, body, rating, latitude, longitude, user_id
      FROM Posts
      WHERE latitude BETWEEN $1 AND $2
      AND longitude BETWEEN $3 AND $4`,
      [latitude - 2.5, latitude + 2.5, longitude - 2.5, longitude + 2.5]
    );

    if (!distance) return result.rows;
    // Default max distance
    if (distance > 250) distance = 250;

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
    const result = await db.query(
      `SELECT id, body, rating, latitude, longitude, user_id
      FROM Posts
      WHERE id=$1`,
      [id]
    );

    if (result.rows.length === 0) throw new NotFoundError('Post Not Found');
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

    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE id=$1`,
      [id]
    );

    if (userResult.rows.length === 0) throw new NotFoundError('User Not Found');

    const result = await db.query(
      `SELECT id, body, rating, latitude, longitude, user_id
      FROM Posts
      WHERE user_id=$1`,
      [id]
    );

    return result.rows;
  }

  static async uprate(id) {
    const post = await db.query(
      `SELECT id, rating
      FROM Posts 
      WHERE id=$1`,
      [id]
    );

    if (!post.rows.length) {
      throw new NotFoundError('Post Not Found');
    }

    let newRating = post.rows[0].rating + 1;

    const newPost = await db.query(
      `UPDATE Posts
      SET rating=$1
      RETURNING id, body, rating, user_id`,
      [newRating]
    );

    return newPost.rows[0];
  }

  static async downrate(id) {
    const post = await db.query(
      `SELECT id, rating
      FROM Posts 
      WHERE id=$1`,
      [id]
    );

    if (!post.rows.length) {
      throw new NotFoundError('Post Not Found');
    }

    let newRating = post.rows[0].rating - 1;

    const newPost = await db.query(
      `UPDATE Posts
      SET rating=$1
      RETURNING id, body, rating, user_id`,
      [newRating]
    );

    return newPost.rows[0];
  }

  static async create(username, body, location) {
    const userResult = await db.query(
      `SELECT id, username 
      FROM Users 
      WHERE username=$1`,
      [username]
    );

    if (userResult.rows.length === 0) throw new NotFoundError('User Not Found');

    const user_id = userResult.rows[0].id;

    const latitude = parseFloat(location.latitude);
    const longitude = parseFloat(location.longitude);

    const post = await db.query(
      `INSERT INTO Posts
      (body, latitude, longitude, user_id)
      VALUES
      ($1, $2, $3, $4)
      RETURNING
      id, body, rating, latitude, longitude, user_id `,
      [body, latitude, longitude, user_id]
    );

    if (!post.rows[0]) throw new BadRequestError();

    return post.rows[0];
  }
}

module.exports = Post;