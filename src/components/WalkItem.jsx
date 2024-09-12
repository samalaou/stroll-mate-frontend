import { useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MapIcon from '@mui/icons-material/Map';
import WalkDetails from './WalkDetails';
import MapViewer from './MapViewer';
import CostumDialog from './CostumDialog';
import { AuthContext } from "../context/auth.context";

const WalkItem = ({ walk, onClick, onDelete }) => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(walk._id);
    };

    const handleMapClick = (e) => {
        e.stopPropagation();
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const isOwner = isLoggedIn && user?._id === walk.user._id;

    return (
        <Paper
        sx={{ 
            marginBottom: 2,
            position: 'relative',
            cursor: isOwner ? 'pointer' : 'default',
            pointerEvents: isOwner ? 'auto' : 'none'
        }}
        >
            {walk.rectangle && walk.rectangle.length > 0 && (
                <>
                    <IconButton 
                        onClick={handleMapClick}
                        color="primary"
                        sx={{ position: 'absolute', top: 8, right: 48 }}
                    >
                        <MapIcon />
                    </IconButton>

                    <CostumDialog
                        open={dialogOpen}
                        onClose={handleCloseDialog}
                        title="Map Viewer"
                        >
                            <MapViewer walk={walk} />
                    </CostumDialog>
                </>
            )}
            
            {isLoggedIn && isOwner && (
                <IconButton 
                    onClick={handleDeleteClick} 
                    color="secondary"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <DeleteIcon />
                </IconButton>
            )}
            
            <WalkDetails walk={walk} onClick={isOwner ? onClick : undefined} />
        </Paper>
    );
};

export default WalkItem;
