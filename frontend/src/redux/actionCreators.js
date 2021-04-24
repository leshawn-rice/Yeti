import { LOGIN_USER, SHOW_ERRORS } from './actionTypes';
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
      const user = localStorage.getItem('yeti-user-object');
      loginUser(user);
    }
    catch (err) {
      dispatch(showErrors([err]))
    }
  }
}

const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

const showErrors = (errors) => {
  return {
    type: SHOW_ERRORS,
    payload: errors
  }
}

export { checkLocalStorage }
