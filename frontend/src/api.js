import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

class YetiApi {

  /**
   * Generic static method to send a request to the backend API
   * 
   * Accepts an endpoint, token, data, and a method and sends a request to the API
   * using the given params. If an error occurs, puts any errors into an arry and throws the arry as an error
   */

  static async request(endpoint, token = undefined, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message;
      let status;
      let errorToThrow;
      if (err.message === 'Network Error') {
        message = err.message;
        status = 500;
        errorToThrow = [{ message, status }]
      }
      else {
        message = err.response.data.error.message;
        status = err.response.data.error.status;
        errorToThrow = Array.isArray(message) ? message.map(msg => { return { message: msg, status } }) : [{ message, status }];
      }
      throw errorToThrow;
    }
  }

  // Individual API routes

  // User Routes

  /**
   * Gets the user from the API given their ID
   */

  static async getUserById(id) {
    let res = await this.request(`users/${id}`, undefined, {}, 'get');
    return { user: res.user };
  }

  /**
   * Gets a new token and user data from the API given a token and username
   */

  static async refresh(token, username) {
    let res = await this.request(`auth/refresh/${username}`, token, {}, 'get');
    return { token: res.token, user: res.user };
  }

  /**
   * Gets user data from the API given an email & password (loginData)
   */

  static async login(loginData) {
    let res = await this.request('auth/login', undefined, loginData, 'post');
    return { token: res.token, user: res.user };
  }

  /**
   * Gets user data from the API given an email & password (registerData)
   */

  static async register(registerData) {
    let res = await this.request('auth/register', undefined, registerData, 'post');
    return { token: res.token, user: res.user };
  }

  /**
   * Gets new user data from the API given a token, username, and new email address
   */

  static async updateEmail(token, username, email) {
    let res = await this.request(`users/${username}/change-email`, token, { email }, 'patch');
    return { token: res.token, user: res.user };
  }

  /**
   * Gets new user data from the API given a token, username, and new password
   */

  static async updatePassword(token, username, oldPassword, newPassword) {
    let res = await this.request(`users/${username}/change-password`, token, { oldPassword, newPassword }, 'patch');
    return { token: res.token, user: res.user };
  }

  /**
   * Sends a new confirmation email and gets a success message from the API
   */

  static async resendConfirmation(email) {
    let res = await this.request('auth/resend-confirmation-email', undefined, { email }, 'post');
    return { message: res.message };
  }

  /**
   * Sends the confirmation token to the API and gets a new user token & user data
   */

  static async confirmEmail(token) {
    let res = await this.request('auth/confirm-email', undefined, { emailToken: token }, 'post');
    return { token: res.token, user: res.user };
  }

  /**
   * Gets a success message from the API, sending data to be emailed to the server
   */

  static async contact(data) {
    let res = await this.request(`users/contact`, undefined, data, 'post');
    return { message: res.message };
  }

  static async patchUser(token, id, userData) {
    let res = await this.request(`users/${id}`, token, userData, 'patch');
    return res.user;
  }

  /**
   * Deletes a user given a token and username
   */

  static async deleteUser(token, username) {
    let res = await this.request(`users/${username}`, token, {}, 'delete');
    return { message: res.message };
  }

  // Post Routes

  /**
   * Gets an array of posts within the given parameters in location
   */

  static async getLocalPosts(location) {
    let res = await this.request(`posts/find`, undefined, location, 'get');
    return { posts: res.posts };
  }

  /**
   * Gets a single post with the given id, authenticating with the token
   */

  static async getPost(token, id) {
    let res = await this.request(`posts/${id}`, token, {}, 'get');
    return { post: res.post }
  }

  /**
   * Creates and gets a new post for the user with the given username, from the postData
   */

  static async createPost(token, username, postData) {
    let res = await this.request(`posts/${username}`, token, postData, 'post');
    return { post: res.post };
  }

  /**
   * Gets a comment and rating from the API, uprating the post with the given ID
   */

  static async upratePost(token, user_id, post_id) {
    let res = await this.request(`posts/${post_id}/uprate`, token, { user_id }, 'post');
    return { post: res.post, rating: res.rating };
  }

  /**
   * Gets a comment and rating from the API, downrating the post with the given ID
   */

  static async downratePost(token, user_id, post_id) {
    let res = await this.request(`posts/${post_id}/downrate`, token, { user_id }, 'post');
    return { post: res.post, rating: res.rating };
  }

  /**
   * Gets a comment from the API, saving a post for the given username, comment_id, and user_id
   */

  static async savePost(token, username, id, user_id) {
    let res = await this.request(`posts/${username}/${id}/save`, token, { user_id }, 'post');
    return { post: res.post };
  }

  /**
   * Gets a success message from the API, unsaving a post from the user with the given username 
   */

  static async unsavePost(token, username, id, user_id) {
    let res = await this.request(`posts/${username}/${id}/unsave`, token, { user_id }, 'delete');
    return { message: res.message };
  }

  /**
   * Removes a post from the db given a token, username, and id
   */

  static async deletePost(token, username, id) {
    let res = await this.request(`posts/${username}/${id}`, token, {}, 'delete');
    return { message: res.message };
  }

  // Comment Routes

  /**
   * Creates and gets comment data from the API
   */

  static async createComment(token, username, commentData) {
    let res = await this.request(`comments/${username}`, token, commentData, 'post');
    return { comment: res.comment };
  }

  /**
   * Gets a comment with the given id from the API
   */

  static async getComment(token, id) {
    let res = await this.request(`comments/${id}`, token, {}, 'get');
    return { comment: res.comment };
  }

  /**
   * Gets a comment and rating from the API, uprating the comment with the given ID
   */

  static async uprateComment(token, user_id, comment_id) {
    let res = await this.request(`comments/${comment_id}/uprate`, token, { user_id }, 'post');
    return { comment: res.comment, rating: res.rating };
  }

  /**
   * Gets a comment and rating from the API, downrating the comment with the given ID
   */

  static async downrateComment(token, user_id, comment_id) {
    let res = await this.request(`comments/${comment_id}/downrate`, token, { user_id }, 'post');
    return { comment: res.comment, rating: res.rating };
  }

  /**
   * Gets a comment from the API, saving a comment for the given username, comment_id, and user_id
   */

  static async saveComment(token, username, id, user_id) {
    let res = await this.request(`comments/${username}/${id}/save`, token, { user_id }, 'post');
    return { comment: res.comment };
  }

  /**
   * Gets a success message from the API, unsaving a comment from the user with the given username 
   */

  static async unsaveComment(token, username, id, user_id) {
    let res = await this.request(`comments/${username}/${id}/unsave`, token, { user_id }, 'delete');
    return { message: res.message };
  }

  /**
   * Removes a comment from the db given a token, username, and id
   */

  static async deleteComment(token, username, id) {
    let res = await this.request(`comments/${username}/${id}`, token, {}, 'delete');
    return { message: res.message };
  }
}


export default YetiApi;