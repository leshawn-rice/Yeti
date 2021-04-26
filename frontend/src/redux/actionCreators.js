import { LOGIN_USER, SHOW_ERRORS, CLEAR_ERRORS } from './actionTypes';
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

const checkLocalStorage = () => {
  return function (dispatch) {
    try {
      dispatch(clearErrors())
      const user = localStorage.getItem('yeti-user-object');
      const token = localStorage.getItem('yeti-user-token');
      if (!user || !token) return;
      const parsedUser = JSON.parse(user);
      const parsedToken = JSON.parse(token);
      loginUser({ token: parsedToken, user: parsedUser });
    }
    catch (err) {
      dispatch(showErrors([err]));
    }
  }
}

const addToLocalStorage = ({ token, user }) => {
  try {
    const userJSON = JSON.stringify(user);
    const tokenJSON = JSON.stringify(token);
    localStorage.setItem('yeti-user-object', userJSON);
    localStorage.setItem('yeti-user-token', tokenJSON);
  }
  catch (err) {
    return err;
  }
}

const registerUserApi = (userData) => {
  return async function (dispatch) {
    try {
      dispatch(clearErrors())
      const { token, user } = await YetiApi.register(userData);
      dispatch(loginUser({ token, user }));
      addToLocalStorage({ token, user })
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

export { checkLocalStorage, registerUserApi, showErrors, clearErrors }
