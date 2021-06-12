const { RADIANS, EARTH_RADIUS } = require('../config');

/**
 * 
 * @param {float} latDistance 
 * @param {float} lonDistance 
 * @param {float} lat1 
 * @param {float} lat2 
 * @returns the distance between two radial points given the radial distance between 2 latitudes, & 2 longitudes, 
 * calculated using the haversine formula
 */

function getHaversine(latDistance, lonDistance, lat1, lat2) {
  const a =
    Math.pow(Math.sin(latDistance / 2), 2) +
    Math.pow(Math.sin(lonDistance / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));
  return EARTH_RADIUS * c;
}

/**
 * 
 * @param {array of floats} location1 
 * @param {array of floats} location2
 * @returns given 2 latitude/longitude points as arrays, returns the distance between the 2 points
 */

function calculateDistance([lat1, lon1] = [], [lat2, lon2] = []) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return undefined;
  // Get the radians of the distance between the lats/longs
  const latDistance = RADIANS * (lat2 - lat1);
  const lonDistance = RADIANS * (lon2 - lon1);
  // Convert from degrees to radians for the latitudes
  lat1 *= RADIANS;
  lat2 *= RADIANS;
  return getHaversine(latDistance, lonDistance, lat1, lat2);
}

module.exports = { calculateDistance };