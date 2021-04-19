import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const BASE_URL = 'https://ipinfo.io';

class GeoLocator {
  static async getLocation() {
    let response = await axios.get(BASE_URL, { params: { token: API_KEY } });
    console.log(response);
    // '46.7352,-117.1729' -> ['46.7352', '-117.1729'];
    const location = response.data.loc.split(',');
    return { latitude: location[0], longitude: location[1] }
  }
}

export default GeoLocator;