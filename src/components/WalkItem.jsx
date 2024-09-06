import { useContext } from "react";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import WalkDetails from './WalkDetails';
import { AuthContext } from "../context/auth.context";

const WalkItem = ({ walk, onClick, onDelete }) => {
    const { isLoggedIn } = useContext(AuthContext);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(walk._id);
    };

    return (
        <Paper
            sx={{ 
                marginBottom: 2,
                cursor: isLoggedIn ? 'pointer' : 'default',
                position: 'relative',
            }}
            onClick={() => onClick(walk)}
        >
            {isLoggedIn &&
                <IconButton 
                    onClick={handleDeleteClick} 
                    color="secondary"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <DeleteIcon />
                </IconButton>
            }
            <WalkDetails walk={walk} />
        </Paper>
    );
};

export default WalkItem;
