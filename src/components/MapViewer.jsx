import Map from './Map';
import { useState, useEffect } from 'react';

const MapViewer = ({ walk }) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    const request = {
      origin: new window.google.maps.LatLng(walk.rectangle[0][0], walk.rectangle[0][1]),
      destination: new window.google.maps.LatLng(walk.rectangle[0][0], walk.rectangle[0][1]),
      waypoints: walk.rectangle.slice(1).map((point) => ({
        location: new window.google.maps.LatLng(point[0], point[1]),
        stopover: false,
      })),
      travelMode: 'WALKING',
      unitSystem: window.google.maps.UnitSystem.METRIC,
      optimizeWaypoints: true,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.log('Error fetching directions');
      }
    });
  }, [walk]);

  return (
    <Map 
      directionsResponse={directions} 
      zoom={12} 
    />
  );
};

export default MapViewer;
