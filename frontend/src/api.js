import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class YetiApi {
  // static token;

  static async request(endpoint, token = undefined, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

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
      console.error("API Error:", message);
      throw errorToThrow;
    }
  }

  // Individual API routes

  static async patchUser(token, id, userData) {
    let res = await this.request(`users/${id}`, token, userData, 'patch');
    return res.user;
  }

  // User Routes

  static async getUserById(id) {
    let res = await this.request(`users/${id}`, undefined, {}, 'get');
    return { user: res.user };
  }

  static async refresh(token, username) {
    let res = await this.request(`auth/refresh/${username}`, token, {}, 'get');
    return { token: res.token, user: res.user };
  }

  static async login(loginData) {
    let res = await this.request('auth/login', undefined, loginData, 'post');
    return { token: res.token, user: res.user };
  }

  static async register(registerData) {
    let res = await this.request('auth/register', undefined, registerData, 'post');
    return { token: res.token, user: res.user };
  }

  static async updateEmail(token, username, email) {
    let res = await this.request(`users/${username}/change-email`, token, { email }, 'patch');
    return { token: res.token, user: res.user };
  }

  static async updatePassword(token, username, oldPassword, newPassword) {
    let res = await this.request(`users/${username}/change-password`, token, { oldPassword, newPassword }, 'patch');
    return { token: res.token, user: res.user };
  }

  static async resendConfirmation(email) {
    let res = await this.request('auth/resend-confirmation-email', undefined, { email }, 'post');
    return { message: res.message };
  }

  static async confirmEmail(token) {
    let res = await this.request('auth/confirm-email', undefined, { emailToken: token }, 'post');
    return { token: res.token, user: res.user };
  }

  static async contact(data) {
    let res = await this.request(`users/contact`, undefined, data, 'post');
    return { message: res.message };
  }

  static async deleteUser(token, username) {
    let res = await this.request(`users/${username}`, token, {}, 'delete');
    return { message: res.message };
  }

  // Post Routes

  static async getLocalPosts(location) {
    let res = await this.request(`posts/find`, undefined, location, 'get');
    return { posts: res.posts };
  }

  static async getPost(token, id) {
    let res = await this.request(`posts/${id}`, token, {}, 'get');
    return { post: res.post }
  }

  static async createPost(token, username, postData) {
    let res = await this.request(`posts/${username}`, token, postData, 'post');
    return { post: res.post };
  }

  static async upratePost(token, user_id, post_id) {
    let res = await this.request(`posts/${post_id}/uprate`, token, { user_id }, 'post');
    return { post: res.post, rating: res.rating };
  }

  static async downratePost(token, user_id, post_id) {
    let res = await this.request(`posts/${post_id}/downrate`, token, { user_id }, 'post');
    return { post: res.post, rating: res.rating };
  }

  static async deletePost(token, username, id) {
    let res = await this.request(`posts/${username}/${id}`, token, {}, 'delete');
    return { message: res.message };
  }

  // Comment Routes

  static async createComment(token, username, commentData) {
    let res = await this.request(`comments/${username}`, token, commentData, 'post');
    return { comment: res.comment };
  }

  static async getComment(token, id) {
    let res = await this.request(`comments/${id}`, token, {}, 'get');
    return { comment: res.comment };
  }

  static async uprateComment(token, user_id, comment_id) {
    let res = await this.request(`comments/${comment_id}/uprate`, token, { user_id }, 'post');
    return { comment: res.comment, rating: res.rating };
  }

  static async downrateComment(token, user_id, comment_id) {
    let res = await this.request(`comments/${comment_id}/downrate`, token, { user_id }, 'post');
    return { comment: res.comment, rating: res.rating };
  }

  static async deleteComment(token, username, id) {
    let res = await this.request(`comments/${username}/${id}`, token, {}, 'delete');
    return { message: res.message };
  }
}


export default YetiApi;