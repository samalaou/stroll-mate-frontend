class GoogleService {
  constructor() {
    this.geocoder = new google.maps.Geocoder();
    this.directionsService = new google.maps.DirectionsService();
  }

  async getCoordinates(address) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0]?.geometry?.location;
          if (location) {
            const lat = location.lat();
            const lng = location.lng();
            resolve({ lat, lng });
          } else {
            resolve(null);
          }
        } else {
          reject(new Error(`Geocode was not successful: ${status}`));
        }
      });
    });
  }
  

  async getDirections(rectangle) {
    return new Promise((resolve, reject) => {
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

      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(result);
        } else {
          reject(new Error('Error fetching directions'));
        }
      });
    });
  }
}

const googleService = new GoogleService();
export default googleService;
