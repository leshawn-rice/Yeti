import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const BASE_URL = 'https://ipinfo.io';

class GeoLocator {

  static async getCoordinates(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  static async getLocation() {
    const location = {};

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const pos = await this.getCoordinates(options);
    location.latitude = pos.coords.latitude;
    location.longitude = pos.coords.longitude;

    if (!location.latitude) throw new Error('Location could not be found!');

    return location
  }

  static async getLocationApi() {
    const response = await axios.get(BASE_URL, { params: { token: API_KEY } });

    const pos = response.data.loc.split(',');

    const location = { latitude: parseFloat(pos[0]), longitude: parseFloat(pos[1]) }

    return location;
  }
}

export default GeoLocator;