import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, FormControlLabel, Switch } from '@mui/material';
import PageHeader from '../components/PageHeader';
import usersService from '../services/users.service';

function UserPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await usersService.getUser();
        setUser(response.data);
        setAvailability(response.data.isAvailable);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'An error occurred');
      }
    };

    getUserProfile();
  }, []);

  const handleAvailabilityChange = async (event) => {
    const newAvailability = event.target.checked;
    const updatedUser = {
      ...user,
      isAvailable: newAvailability
    };
  
    try {
      await usersService.updateUser(updatedUser);
      setAvailability(newAvailability);
      setUser(updatedUser);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred while updating availability');
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
        <PageHeader title={`${user ? user.name.toUpperCase() : "User Profile"}`} />
      {error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : !user ? (
        <Typography variant="h6">
          User not found
        </Typography>
      ) : (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                <strong>Email:</strong> {user.email}
                </Typography>
                <FormControlLabel
                control={
                    <Switch
                    checked={availability}
                    onChange={handleAvailabilityChange}
                    />
                }
                label={availability ? 'Available' : 'Not Available'}
                />
            </CardContent>
        </Card>
      )}
    </Container>
  );
}
export default UserPage;
