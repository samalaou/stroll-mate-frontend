import { useState, useContext, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import googleService from '../services/google.api';
import { generateRectangle } from '../utils/utils';
import { AuthContext } from "../context/auth.context";
import AddWalk from './AddWalk';
import CostumDialog from './CostumDialog';
import Map from './Map';

const HomeMap = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [startLocation, setStartLocation] = useState('');
  const [center, setCenter] = useState({
    lat: 52.520008,
    lng: 13.404954,
  }); // Default center is Berlin
  const [walkGenerated, setWalkGenerated] = useState(false);
  const [showAddWalk, setShowAddWalk] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [generatedRect, setGeneratedRect] = useState([]);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      { types: ['address'] }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setStartLocation(place.formatted_address);
      } else {
        console.log('No details available for the selected address.');
      }
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []); 

  const handleGenerateItinerary = async () => {
    if (!startLocation) {
      console.log('Please provide a starting point.');
      return;
    }
  
    const location = await googleService.getCoordinates(startLocation);
    if (!location) {
      console.log('Could not find coordinates for the starting location.');
      return;
    }
  
    const distance = 1; // Distance for rectangle
    const newRect = generateRectangle(location, distance);
  
    const directionsService = new window.google.maps.DirectionsService();
  
    const request = {
      origin: new window.google.maps.LatLng(newRect[0][0], newRect[0][1]),
      destination: new window.google.maps.LatLng(newRect[0][0], newRect[0][1]),
      waypoints: newRect.slice(1).map((point) => ({
        location: new window.google.maps.LatLng(point[0], point[1]),
        stopover: false,
      })),
      travelMode: 'WALKING',
      unitSystem: window.google.maps.UnitSystem.METRIC,
      optimizeWaypoints: true,
    };
  
    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirectionsResponse(result);
        setWalkGenerated(true);
        setGeneratedRect(newRect);
      } else {
        console.log('Error fetching directions');
      }
    });
  };
  
  const handleAddWalk = (newWalk) => {
    console.log('New walk added:', newWalk);
    setShowAddWalk(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box>
        <Map center={center} directionsResponse={directionsResponse} zoom={12} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Starting Point"
            inputRef={autocompleteRef}
            margin="normal"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateItinerary}
          >
            Generate Itinerary
          </Button>
          {isLoggedIn && walkGenerated && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAddWalk(true)}
              >
                Save Walk
              </Button>
              <CostumDialog
                open={showAddWalk}
                onClose={() => setShowAddWalk(false)}
                title="Add Walk"
                actions={
                  <Button onClick={() => setShowAddWalk(false)} color="primary">
                    Close
                  </Button>
                }
              >
                <AddWalk
                  onAddWalk={handleAddWalk}
                  startingPoint={startLocation}
                  endPoint={startLocation}
                  rectangle={generatedRect}
                  readOnly={true} 
                />
              </CostumDialog>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeMap;
