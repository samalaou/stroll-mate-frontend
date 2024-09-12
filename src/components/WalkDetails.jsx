import { Card, CardContent, Typography } from '@mui/material';

const WalkDetails = ({ walk, onClick }) => {
  const isSamePoint = walk.startingPoint === walk.endPoint;

  const formattedDate = new Date(walk.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedStartingPoint = walk.startingPoint.split(',')[0];

  return (
    <Card 
      onClick={() => onClick(walk)}
      sx={{ cursor: 'pointer' }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Walk from {formattedStartingPoint} 
          {!isSamePoint && ` to ${walk.endPoint}`}
        </Typography>
        <Typography variant="body2">
          Duration: {walk.durationInMinutes} minutes
        </Typography>
        <Typography variant="body2">
          Created on: {formattedDate}
        </Typography>
        <Typography variant="body2">
          By: {walk.user.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WalkDetails;
