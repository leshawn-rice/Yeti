const axios = require('axios');
const { API_KEY } = require('../config');

const RADIANS = Math.PI / 180;
const EARTH_RADIUS = 3958.8;

function getHaversine(latDistance, lonDistance, lat1, lat2) {
  const a =
    Math.pow(Math.sin(latDistance / 2), 2) +
    Math.pow(Math.sin(lonDistance / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));
  return EARTH_RADIUS * c;
}

function calculateDistance([lat1, lon1], [lat2, lon2]) {
  // Get the radians of the distance between the lats/longs
  const latDistance = RADIANS * (lat2 - lat1);
  const lonDistance = RADIANS * (lon2 - lon1);
  // Convert from degrees to radians for the latitudes
  lat1 *= RADIANS;
  lat2 *= RADIANS;
  return getHaversine(latDistance, lonDistance, lat1, lat2);
}


// const BASE_URL = 'https://ipinfo.io';

// class GeoLocator {

//   // This will actually go on frontend
//   static async getLocation() {
//     let response = await axios.get(BASE_URL, { params: { token: API_KEY } });
//     // '46.7352,-117.1729' -> ['46.7352', '-117.1729'];
//     const location = response.data.loc.split(',');
//     return { latitude: location[0], longitude: location[1] }
//   }

//   static calculateDistance([lat1, lon1], [lat2, lon2]) {
//     // Get the radians of the distance between the lats/longs
//     const latDistance = RADIANS * (lat2 - lat1);
//     const lonDistance = RADIANS * (lon2 - lon1);
//     // Convert from degrees to radians for the latitudes
//     lat1 *= RADIANS;
//     lat2 *= RADIANS;
//     return getHaversine(latDistance, lonDistance, lat1, lat2);
//   }
// }

module.exports = { calculateDistance };