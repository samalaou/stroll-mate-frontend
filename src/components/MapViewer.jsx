import { useState, useEffect } from 'react';
import googleService from '../services/google.api';
import Map from './Map';

const MapViewer = ({ walk }) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await googleService.getDirections(walk.rectangle);
        setDirections(result);
      } catch (error) {
        console.log('Error fetching directions:', error);
      }
    })()

  }, [walk]);

  return (
    <Map 
      directionsResponse={directions} 
      zoom={12} 
    />
  );
};

export default MapViewer;
