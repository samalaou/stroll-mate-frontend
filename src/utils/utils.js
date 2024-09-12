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

export const getDirections = async (rectangle) => {
  return new Promise((resolve, reject) => {
    const directionsService = new google.maps.DirectionsService();

    const request = {
      origin: new google.maps.LatLng(rectangle[0][0], rectangle[0][1]),
      destination: new google.maps.LatLng(rectangle[0][0], rectangle[0][1]),
      waypoints: rectangle.slice(1).map((point) => ({
        location: new google.maps.LatLng(point[0], point[1]),
        stopover: false,
      })),
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC,
      optimizeWaypoints: true,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result);
      } else {
        reject(new Error('Error fetching directions'));
      }
    });
  });
};
