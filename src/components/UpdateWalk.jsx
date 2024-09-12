import walksService from '../services/walks.service';
import WalksForm from './WalksForm';

const UpdateWalk = ({ onUpdateWalk, walk }) => {

  const handleSubmit = async (walk) => {
    try {
      const response = await walksService.updateWalk(walk._id, walk);
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
