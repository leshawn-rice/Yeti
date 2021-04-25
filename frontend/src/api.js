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
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async patchUser(token, username, userData) {
    let res = await this.request(`users/${username}`, token, userData, 'patch');
    return res.user;
  }

  static async login(loginData) {
    let res = await this.request('auth/token', undefined, loginData, 'post');
    return res.token;
  }

  static async register(registerData) {
    let res = await this.request('auth/register', undefined, registerData, 'post');
    return res.token;
  }
}


export default YetiApi;