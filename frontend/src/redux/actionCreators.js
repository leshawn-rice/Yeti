import {
  LOGIN_USER,
  SHOW_ERRORS,
  CLEAR_ERRORS,
  LOGOUT_USER,
  START_LOADING,
  STOP_LOADING
} from './actionTypes';
import YetiApi from '../api';
// import GeoLocator from '../GeoLocater';
// useEffect(() => {
//   const locate = async () => {
//     try {
//       // Serving over HTTPS, use window GeoLocation API
//       const domLocation = await GeoLocator.getLocationDOM();
//       setLocation(domLocation);
//       setLoading(false);
//     }
//     catch (err) {
//       try {
//         // Serving over HTTP, or disallow location, use less accurate ipinfo API
//         const apiLocation = await GeoLocator.getLocationAPI();
//         setLocation(apiLocation);
//         setLoading(false);
//       }
//       catch (e) {
//         console.warn('Error getting location data!')
//       }
//     }
//   }
//   locate();
// }, [])

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
      dispatch(clearErrors())
      const { token, user } = await YetiApi.login(userData);
      dispatch(loginUser({ token, user }));
    }
    catch (errs) {
      dispatch(showErrors(errs))
    }
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

export { registerUserApi, loginUserApi, showErrors, clearErrors, logoutUser, stopLoading }
