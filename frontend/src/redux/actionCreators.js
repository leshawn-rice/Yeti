import YetiApi from '../api';
import GeoLocator from '../GeoLocater';
import {
  LOGIN_USER,
  SHOW_ERRORS,
  CLEAR_ERRORS,
  LOGOUT_USER,
  START_LOADING,
  STOP_LOADING,
  SET_LOCATION
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

const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    payload: location
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

export { getLocationApi, registerUserApi, loginUserApi, showErrors, clearErrors, logoutUser, stopLoading }
