export const generateLocationLink = (latitude, longitude) => {
  if (!latitude || !longitude) {
    return 'Location not available';
  }
  
  // Google Maps link
  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  
  // OpenStreetMap link
  const osmLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`;
  
  return googleMapsLink;
};

export const getAddressFromCoordinates = async (latitude, longitude) => {
  // If you want to use a geocoding service like Google Maps API or OpenStreetMap
  // For now, return a simple formatted location string
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};

export const validateLocation = (latitude, longitude) => {
  if (latitude < -90 || latitude > 90) {
    throw new Error('Invalid latitude');
  }
  if (longitude < -180 || longitude > 180) {
    throw new Error('Invalid longitude');
  }
  return true;
};