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
      `SELECT id, title, body, rating, latitude, longitude, user_id
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
      `SELECT id, title, body, rating, latitude, longitude, user_id
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
      `SELECT id, title, body, rating, latitude, longitude, user_id
      FROM Posts
      WHERE id=$1`,
      [id]
    );

    if (result.rows.length === 0) throw new BadRequestError('No post found!');
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

    if (userResult.rows.length === 0) throw BadRequestError('No user found!');

    const result = await db.query(
      `SELECT id, title, body, rating, latitude, longitude, user_id
      FROM Posts
      WHERE user_id=$1`,
      [id]
    );

    if (result.rows.length === 0) throw new BadRequestError('User has no posts!');
    return result.rows;
  }
}

module.exports = Post;