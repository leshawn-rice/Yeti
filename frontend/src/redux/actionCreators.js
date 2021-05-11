import YetiApi from '../api';
import GeoLocator from '../GeoLocater';
import {
  LOGIN_USER,
  LOGOUT_USER,
  DELETE_USER,
  ADD_USER_POST,
  ADD_USER_COMMENT,
  ADD_POST,
  RATE_POST,
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

const handleApiErrors = (errs) => {
  return async function (dispatch) {
    dispatch(stopLoading());
    dispatch(showErrors(errs));
  }
}

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

const deleteUserApi = (token, username) => {
  return async function (dispatch) {
    try {
      dispatch(startApiAction());
      const { message } = await YetiApi.deleteUser(token, username);
      console.log(message);
      dispatch(logoutUser());
      dispatch(endApiAction());
    }
    catch (errs) {
      dispatch(handleApiErrors(errs));
    }
  }
}

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

const rateComment = (comment, rating) => {
  return {
    type: RATE_COMMENT,
    payload: { comment, rating }
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
  deleteUserApi,
  loginUserApi,
  getUserByIdApi,
  getLocalPostsApi,
  createPostApi,
  upratePostApi,
  downratePostApi,
  uprateCommentApi,
  downrateCommentApi,
  createCommentApi,
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
