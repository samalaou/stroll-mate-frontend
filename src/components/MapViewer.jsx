import { useState, useEffect } from 'react';
import Map from './Map';
import { getDirections } from '../utils/utils';

const MapViewer = ({ walk }) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getDirections(walk.rectangle);
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
