import walksService from '../services/walks.service';
import WalksForm from './WalksForm';

const UpdateWalk = ({ onUpdateWalk, walk }) => {

  const handleSubmit = async (walk) => {
    const walkData = {
      startingPoint: walk.startingPoint,
      endPoint: walk.endPoint || walk.startingPoint,
      durationInMinutes: parseInt(walk.durationInMinutes),
    };
  
    try {
      const response = await walksService.updateWalk(walk._id, walkData);
      onUpdateWalk(response.data);
    } catch (error) {
      console.error('Error updating walk:', error);
    }
  };

  return (
    <WalksForm
        onSubmit={handleSubmit}
        walk={walk}
        buttonTitle={'Update walk'}
    />
  );
};

export default UpdateWalk;
