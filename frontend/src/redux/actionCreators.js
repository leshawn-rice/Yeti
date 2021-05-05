import YetiApi from '../api';
import GeoLocator from '../GeoLocater';
import {
  LOGIN_USER,
  LOGOUT_USER,
  DELETE_USER,
  ADD_USER_POST,
  ADD_POST,
  GET_POSTS,
  LOAD_POSTS,
  CLEAR_POSTS,
  SHOW_ERRORS,
  CLEAR_ERRORS,
  START_LOADING,
  STOP_LOADING,
  SET_LOCATION,
  CLEAR_LOCATION,
} from './actionTypes';

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

const registerUserApi = (userData) => {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      dispatch(clearErrors());
      const { token, user } = await YetiApi.register(userData);
      dispatch(loginUser({ token, user }));
      dispatch(stopLoading());
    }
    catch (errs) {
      dispatch(showErrors(errs));
      dispatch(stopLoading());
    }
  }
}

const loginUserApi = (userData) => {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      dispatch(clearErrors());
      const { token, user } = await YetiApi.login(userData);
      dispatch(loginUser({ token, user }));
      dispatch(stopLoading());
    }
    catch (errs) {
      dispatch(stopLoading());
      dispatch(showErrors(errs));
    }
  }
}

const getUserByIdApi = (id) => {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      dispatch(clearErrors());
      const { user } = await YetiApi.getUserById(id);
      dispatch(stopLoading());
      return user;
    }
    catch (errs) {
      dispatch(stopLoading());
      dispatch(showErrors(errs));
    }
  }
}

const deleteUserApi = (token, username) => {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      dispatch(clearErrors());
      const { message } = await YetiApi.deleteUser(token, username);
      console.log(message);
      dispatch(logoutUser());
      dispatch(stopLoading());
    }
    catch (errs) {
      dispatch(stopLoading());
      dispatch(showErrors(errs));
    }
  }
}

const getLocalPostsApi = (location) => {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      dispatch(clearErrors());
      const { posts } = await YetiApi.getLocalPosts(location);
      dispatch(addPosts(posts));
      dispatch(stopLoading());
    }
    catch (errs) {
      dispatch(stopLoading());
      dispatch(showErrors(errs));
    }
  }
}

const createPostApi = (token, username, postData) => {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      dispatch(clearErrors());
      const { post } = await YetiApi.createPost(token, username, postData);
      dispatch(addUserPost(post));
      dispatch(addPost(post));
      dispatch(stopLoading());
    }
    catch (errs) {
      dispatch(stopLoading());
      dispatch(showErrors(errs));
    }
  }
}

const getPostApi = (token, id) => {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      dispatch(clearErrors());
      const { post } = await YetiApi.getPost(token, id);
      dispatch(stopLoading());
      return post;
    }
    catch (errs) {
      dispatch(stopLoading());
      dispatch(showErrors(errs));
    }
  }
}

const addUserPost = (post) => {
  return {
    type: ADD_USER_POST,
    payload: post
  }
}

const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post
  }
}

const addPosts = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts
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
  registerUserApi,
  deleteUserApi,
  loginUserApi,
  getUserByIdApi,
  getLocalPostsApi,
  createPostApi,
  getPostApi,
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
