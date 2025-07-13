import axios from 'axios';

const API_KEY = '5b3ce3597851110001cf6248df799d5a930f4ad88202a3c8f74d96b2';

export async function getCoordinates(place) {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(place)}`;

  try {
    const response = await axios.get(url);
    return response.data.features[0].geometry.coordinates; 
  } catch (err) {
    console.error(`Error getting coordinates for ${place}:`, err.message);
    return null;
  }
}

export async function getDistanceFromPlaces(fromPlace, toPlace) {
  const fromCoords = await getCoordinates(fromPlace);
  const toCoords = await getCoordinates(toPlace);

  if (!fromCoords || !toCoords) return null;

  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${fromCoords[0]},${fromCoords[1]}&end=${toCoords[0]},${toCoords[1]}`;

  try {
    const response = await axios.get(url);
    const distanceMeters = response.data.features[0].properties.summary.distance;
    return (distanceMeters / 1000).toFixed(2); 
  } catch (err) {
    console.error("Error getting distance:", err.message);
    return null;
  }
}
