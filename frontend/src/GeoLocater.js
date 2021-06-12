import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://ipinfo.io';

/**
 * GeoLocator class for locating the user
 */

class GeoLocator {

  /**
   * 
   * @param {object} options 
   * returns a promise with the value of calling the window navigator API with the given options
   */

  static async getDOMCoordinates(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  /**
   * 
   * uses the window navigator API to get the user's location from the DOM
   * 
   * This is more accurate than IPInfo and should be the first option for getting a user's location
   */

  static async getLocationDOM() {
    const location = {};

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const pos = await this.getDOMCoordinates(options);
    location.latitude = pos.coords.latitude;
    location.longitude = pos.coords.longitude;

    if (!location.latitude) throw new Error('Location could not be found!');

    return location
  }

  /**
   * 
   * uses the IPInfo API to get the user's location from their IP address. This is less accurate than the window API and should be used as a last resort
   */

  static async getLocationAPI() {
    const response = await axios.get(BASE_URL, { params: { token: API_KEY } });
    const pos = response.data.loc.split(',');
    const location = { latitude: parseFloat(pos[0]), longitude: parseFloat(pos[1]) }

    return location;
  }
}

export default GeoLocator;