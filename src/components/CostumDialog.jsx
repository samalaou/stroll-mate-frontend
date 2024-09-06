import { Dialog, DialogContent, DialogTitle, IconButton, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CostumDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle >
                {props.title}
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={props.onClose}
                    aria-label="close"
                    sx={{position: 'absolute', right: 12, top: 8}}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {props.children}
            </DialogContent>
            {props.actions && (
                <DialogActions >
                    {props.actions}
                </DialogActions>
            )}
        </Dialog>
    );
}

export default CostumDialog;
