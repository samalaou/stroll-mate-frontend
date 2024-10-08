import { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function MessageInput({ onSend }) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box 
            display="flex"
            alignItems="center"
            p={1}
            borderTop={1}
            borderColor="divider"
            bgcolor="background.paper"
        >
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
            />
            <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
            </IconButton>
        </Box>
    );
}

export default MessageInput;
