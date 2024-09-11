import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { mapContainerStyle } from '../styles/style';

const Map = ({ center, directionsResponse, zoom = 12 }) => {
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      {...(center && { center })}
    >
      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
    </GoogleMap>
  );
};

export default Map;
