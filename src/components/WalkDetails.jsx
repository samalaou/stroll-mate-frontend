import { Card, CardContent, Typography } from '@mui/material';

const WalkDetails = ({ walk }) => {
  return (
    <Card >
      <CardContent>
        <Typography variant="h5" component="div">
          Walk from {walk.startingPoint} to {walk.endPoint}
        </Typography>
        <Typography variant="body2">
          Duration: {walk.durationInMinutes} minutes
        </Typography>
        <Typography variant="body2">
          Created by: {walk.user.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WalkDetails;
