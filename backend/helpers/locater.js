const { RADIANS, EARTH_RADIUS } = require('../config');

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

module.exports = { calculateDistance };