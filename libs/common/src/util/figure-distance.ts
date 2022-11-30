export const figureDistance = (
  start: { lat: number; lon: number },
  end: { lat: number; lon: number }
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(end.lat - start.lat); // deg2rad below
  const dLon = deg2rad(end.lon - start.lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(start.lat)) *
      Math.cos(deg2rad(end.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  return (R * c).toFixed(2);
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
