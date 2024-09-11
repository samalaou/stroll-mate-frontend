import { useState, useEffect, useContext } from 'react';
import WalkItem from './WalkItem';
import AddWalk from './AddWalk';
import UpdateWalk from './UpdateWalk';
import { Container, Box, Button, Alert } from '@mui/material';
import CostumDialog from './CostumDialog';
import walksService from '../services/walks.service';
import { AuthContext } from "../context/auth.context";
import PageHeader from './PageHeader';

const WalksOverview = () => {
    const [walks, setWalks] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedWalk, setSelectedWalk] = useState(null);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            try {
                const response = await walksService.getAllWalks();
                setWalks(response.data);
            } catch (err) {
                console.error(err);
                setError("An error occurred while fetching walks.");
            }
        })();
    }, []);

    const handleDialogClose = () => setDialogOpen(false);

    const handleDialogOpen = (walk = null) => {
        setSelectedWalk(walk);
        setIsCreating(!walk);
        setDialogOpen(true);
    };

    const handleAddWalk = (newWalk) => {
        setWalks((prev) => [...prev, newWalk]);
        handleDialogClose();
    };

    const handleUpdateWalk = (updatedWalk) => {
        setWalks((prev) =>
            prev.map((walk) => (walk._id === updatedWalk._id ? updatedWalk : walk))
        );
        handleDialogClose();
    };

    const handleDelete = async (id) => {
        try {
            await walksService.deleteWalk(id);
            setWalks((prev) => prev.filter((walk) => walk._id !== id));
        } catch {
            setError('Failed to delete walk. Please try again later.');
        }
    };

    return (
        <Container>
            <PageHeader title="Walks Overview"/>
            {isLoggedIn &&
            <>
                <Button variant="contained" onClick={() => handleDialogOpen()}>Add New Walk</Button>
                <CostumDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    title={isCreating ? "Create New Walk" : "Update Walk"}
                >
                    {isCreating ? (
                        <AddWalk onAddWalk={handleAddWalk} />
                    ) : (
                        <UpdateWalk walk={selectedWalk} onUpdateWalk={handleUpdateWalk} />
                    )}
                </CostumDialog>
            </>
            }
            {error && <Alert severity="error">{error}</Alert>}

            <Box mt={4}>
                {walks.map((walk) => (
                    <WalkItem
                        key={walk._id}
                        walk={walk}
                        onClick={() => handleDialogOpen(walk)}
                        onDelete={handleDelete}
                    />
                ))}
            </Box>
        </Container>
    );
};

export default WalksOverview;
