import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const WalksForm = ({ onSubmit, walk, buttonTitle, readOnly }) => {
  const [currentWalk, setCurrentWalk] = useState(walk);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(currentWalk);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWalk((prevWalk) => ({
      ...prevWalk,
      [name]: value,
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Box mb={2}>
        <TextField
          required
          fullWidth
          label="Starting Point"
          name="startingPoint"
          value={currentWalk.startingPoint}
          onChange={handleChange}
          disabled={readOnly}
        />
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="End Point"
          name="endPoint"
          value={currentWalk.endPoint}
          onChange={handleChange}
          disabled={readOnly}
        />
      </Box>

      <Box mb={2}>
        <TextField
          required
          fullWidth
          label="Duration (minutes)"
          name="durationInMinutes"
          type="number"
          value={currentWalk.durationInMinutes}
          onChange={handleChange}
        />
      </Box>

      <Button type="submit" fullWidth variant="contained">
        {buttonTitle}
      </Button>
    </Box>
  );
};

export default WalksForm;
