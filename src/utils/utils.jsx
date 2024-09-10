export const generateRectangle = (location, distance) => {
  const latOffset = distance / 111.32; // 1 degree lat ~ 111.32 km
  const lngOffset = distance / (111.32 * Math.cos(location.lat * (Math.PI / 180))); // Adjust for curvature
  return [
    [location.lat, location.lng],
    [location.lat + latOffset, location.lng],
    [location.lat + latOffset, location.lng + lngOffset],
    [location.lat, location.lng + lngOffset],
  ];
};
