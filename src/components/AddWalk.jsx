import { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import walksService from '../services/walks.service';
import WalksForm from './WalksForm';

const AddWalk = ({ onAddWalk, startingPoint, rectangle }) => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (walk) => {
    const walkData = {
      ...walk,
      startingPoint,
      endPoint: walk.endPoint || walk.startingPoint,
      durationInMinutes: parseInt(walk.durationInMinutes),
      ...(rectangle && { rectangle }),
    };

    try {
      const response = await walksService.createWalk(walkData);
      onAddWalk({ ...response.data, user: { _id: user._id, name: user.name } });
    } catch (error) {
      console.error('Error creating walk:', error);
    }
  };

  return (
    <WalksForm
      onSubmit={handleSubmit}
      walk={{
        startingPoint: startingPoint || '',
        endPoint: '',
        durationInMinutes: '',
      }}
      buttonTitle={'Add Walk'}
    />
  );
};

export default AddWalk;
