import YetiApi from '../api';
import GeoLocator from '../GeoLocater';
import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER_POST,
  ADD_USER_COMMENT,
  ADD_POST,
  RATE_POST,
  SAVE_POST,
  UNSAVE_POST,
  DELETE_POST,
  SAVE_COMMENT,
  UNSAVE_COMMENT,
  DELETE_COMMENT,
  RATE_COMMENT,
  GET_POSTS,
  ADD_FULL_POST,
  LOAD_POSTS,
  CLEAR_POSTS,
  SHOW_ERRORS,
  CLEAR_ERRORS,
  START_LOADING,
  STOP_LOADING,
  SET_LOCATION,
  CLEAR_LOCATION,
  REFRESH,
} from './actionTypes';

/**
 * 
 * Called at the start of any action that interacts with the backend API
 * 
 * Starts the loading screen, and clears any errors currently in state
 * 
 */

const startApiAction = () => {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      dispatch(clearErrors());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Called at the end of any action that interacts with the backend API
 * 
 * Ends the loading screen, and handles any errors as necessary
 * 
 */

const endApiAction = () => {
  return async function (dispatch) {
    try {
      dispatch(stopLoading());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * @param {array} errs 
 * 
 * handles any errors thrown in the process of interacting with the backend API
 * 
 * Stops the loading screen and shows the errors
 * 
 */

const handleApiErrors = (errs) => {
  return async function (dispatch) {
    dispatch(stopLoading());
    dispatch(showErrors(errs));
  }
}

/**
 * 
 * Uses the Geolocater to get the user's current location. If an error occurs using the IPInfo API,
 * attempts to use the window navigator API to get the location, if that fails, shows the user an error message.
 * 
 * Otherwise stores the location in state
 */

const getLocationApi = () => {
  return async function (dispatch) {
    try {
      // Serving over HTTPS & allow location, use window GeoLocation API
      const domLocation = await GeoLocator.getLocationDOM();
      dispatch(setLocation(domLocation))
    }
    catch (domError) {
      try {
        // Serving over HTTP or disallow location, use less accurate ipinfo API
        const apiLocation = await GeoLocator.getLocationAPI();
        dispatch(setLocation(apiLocation))
      }
      catch (apiError) {
        dispatch(showErrors(['Location unavailable! Please disable adblock or refresh the page!']));
      }
    }
  }
}

/**
 * 
 * @param {string} oldToken 
 * @param {string} username 
 * 
 * gets a new token and new user data from the backend api using the current token and a username. 
 * Stores the new user in state
 */

const refreshUserApi = (oldToken, username) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { token, user } = await YetiApi.refresh(oldToken, username);
      dispatch(refreshUser(token, user));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * @param {object} userData 
 * 
 * given the userData, registers the user on the backend and stores the new user and token
 * in state
 */

const registerUserApi = (userData) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { token, user } = await YetiApi.register(userData);
      dispatch(loginUser({ token, user }));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * @param {object} userData 
 * 
 * given the userData, logs in the user on the backend and stores the new user and token
 * in state
 */

const loginUserApi = (userData) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { token, user } = await YetiApi.login(userData);
      dispatch(loginUser({ token, user }));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * @param {string} oldToken 
 * @param {string} username 
 * @param {string} email 
 * 
 * Interacts with the backend API to update the user's email, and stores the new token & user in state
 */

const updateEmailApi = (oldToken, username, email) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { token, user } = await YetiApi.updateEmail(oldToken, username, email);
      dispatch(updateUser({ token, user }));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * @param {string} oldToken 
 * @param {string} username 
 * @param {string} oldPassword 
 * @param {string} newPassword 
 * 
 * Interacts with the backend API to update the user's password, and stores the new token & user in state
 */

const updatePasswordApi = (oldToken, username, oldPassword, newPassword) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { token, user } = await YetiApi.updatePassword(oldToken, username, oldPassword, newPassword);
      dispatch(updateUser({ token, user }));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * @param {int} id 
 * Interacts with the backend API to get the user with the given ID and returns them
 */

const getUserByIdApi = (id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { user } = await YetiApi.getUserById(id);
      dispatch(endApiAction());
      return user;
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to delete the user from the DB and removes them from state
 */

const deleteUserApi = (token, username) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { message } = await YetiApi.deleteUser(token, username);
      dispatch(logoutUser());
      dispatch(endApiAction());
      dispatch(showErrors([{ message: message.message, status: 202 }]));
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * @param {object} location 
 * 
 * Interacts with the backend API to get all posts within the distance specified in "location" to the lat/lon
 * specified in "location" and adds them to state
 * 
 */

const getLocalPostsApi = (location) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { posts } = await YetiApi.getLocalPosts(location);
      dispatch(addPosts(posts));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to create a comment in the DB and adds it to state
 */

const createPostApi = (token, username, postData) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { post } = await YetiApi.createPost(token, username, postData);
      dispatch(addUserPost(post));
      dispatch(addPost(post));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to uprate the post in the DB and updates it in state
 */


const upratePostApi = (token, user_id, post_id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { post, rating } = await YetiApi.upratePost(token, user_id, post_id);
      dispatch(ratePost(post, rating));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to downrate the post in the DB and updates it in state
 */


const downratePostApi = (token, user_id, post_id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { post, rating } = await YetiApi.downratePost(token, user_id, post_id);
      dispatch(ratePost(post, rating));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to add a saved_post entry to the DB and adds it to state
 */

const savePostApi = (token, username, id, user_id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { post } = await YetiApi.savePost(token, username, id, user_id);
      dispatch(savePost(post));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to delete the saved_post entry from the DB and removes it from state
 */

const unsavePostApi = (token, username, id, user_id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      await YetiApi.unsavePost(token, username, id, user_id);
      dispatch(unsavePost(id));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to delete the post from the DB and removes it from state
 */

const deletePostApi = (token, username, id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { message } = await YetiApi.deletePost(token, username, id);
      dispatch(deletePost(id));
      dispatch(endApiAction());
      dispatch(showErrors([{ message: `${message.message}! Refresh the page!`, status: 202 }]));
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to uprate the comment in the DB and updates it in state
 */


const uprateCommentApi = (token, user_id, comment_id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { comment, rating } = await YetiApi.uprateComment(token, user_id, comment_id);
      dispatch(rateComment(comment, rating));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to downrate the comment in the DB and updates it in state
 */

const downrateCommentApi = (token, user_id, comment_id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { comment, rating } = await YetiApi.downrateComment(token, user_id, comment_id);
      dispatch(rateComment(comment, rating));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to create a comment in the DB and adds it to state
 */

const createCommentApi = (token, username, postData) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { comment } = await YetiApi.createComment(token, username, postData);
      dispatch(addUserComment(comment));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to add a saved_comment entry to the DB and adds it to state
 */

const saveCommentApi = (token, username, id, user_id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { comment } = await YetiApi.saveComment(token, username, id, user_id);
      dispatch(saveComment(comment));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to delete the saved_post entry from the DB and removes it from state
 */

const unsaveCommentApi = (token, username, id, user_id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      await YetiApi.unsaveComment(token, username, id, user_id);
      dispatch(unsaveComment(id));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * Interacts with the backend API to delete the comment from the DB and removes it from state
 */

const deleteCommentApi = (token, username, id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { message } = await YetiApi.deleteComment(token, username, id);
      dispatch(deleteComment(id));
      dispatch(endApiAction());
      dispatch(showErrors([{ message: `${message.message}! Refresh the page!`, status: 202 }]));
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

/**
 * 
 * @param {string} token 
 * @param {int} id 
 * 
 * Gets all the post data (user, comments, rating etc) from the backend API and stores it
 * in state
 */

const getFullPostApi = (token, id) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { post } = await YetiApi.getPost(token, id);
      dispatch(addFullPost(post));
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

const addUserPost = (post) => {
  return {
    type: ADD_USER_POST,
    payload: post
  }
}

const addUserComment = (comment) => {
  return {
    type: ADD_USER_COMMENT,
    payload: comment
  }
}

const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post
  }
}

const addFullPost = (post) => {
  return {
    type: ADD_FULL_POST,
    payload: post
  }
}

const addPosts = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts
  }
}

const ratePost = (post, rating) => {
  return {
    type: RATE_POST,
    payload: { post, rating }
  }
}

const savePost = (post) => {
  return {
    type: SAVE_POST,
    payload: post
  }
}

const unsavePost = (id) => {
  return {
    type: UNSAVE_POST,
    payload: id
  }
}


const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: id
  }
}

const rateComment = (comment, rating) => {
  return {
    type: RATE_COMMENT,
    payload: { comment, rating }
  }
}

const saveComment = (comment) => {
  return {
    type: SAVE_COMMENT,
    payload: comment
  }
}

const unsaveComment = (id) => {
  return {
    type: UNSAVE_COMMENT,
    payload: id
  }
}

const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    payload: id
  }
}

const loadPosts = () => {
  return {
    type: LOAD_POSTS
  }
}

const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  }
}

const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    payload: location
  }
}

const clearLocation = () => {
  return {
    type: CLEAR_LOCATION
  }
}

const refreshUser = (token, user) => {
  return {
    type: REFRESH,
    payload: { token, user }
  }
}

const loginUser = (userData) => {
  return {
    type: LOGIN_USER,
    payload: userData
  }
}

const logoutUser = () => {
  return {
    type: LOGOUT_USER
  }
}

const updateUser = (data) => {
  return {
    type: UPDATE_USER,
    payload: data
  }
}

const deleteUser = () => {
  return {
    type: DELETE_USER
  }
}

const startLoading = () => {
  return {
    type: START_LOADING
  }
}

const stopLoading = () => {
  return {
    type: STOP_LOADING
  }
}

const showErrors = (errors) => {
  return {
    type: SHOW_ERRORS,
    payload: errors
  }
}


const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

export {
  getLocationApi,
  refreshUserApi,
  registerUserApi,
  updateEmailApi,
  updatePasswordApi,
  deleteUserApi,
  loginUserApi,
  getUserByIdApi,
  getLocalPostsApi,
  createPostApi,
  upratePostApi,
  downratePostApi,
  savePostApi,
  unsavePostApi,
  deletePostApi,
  uprateCommentApi,
  downrateCommentApi,
  createCommentApi,
  saveCommentApi,
  unsaveCommentApi,
  deleteCommentApi,
  getFullPostApi,
  loadPosts,
  clearPosts,
  showErrors,
  clearErrors,
  logoutUser,
  startLoading,
  stopLoading,
  loginUser,
  clearLocation,
  deleteUser
}
