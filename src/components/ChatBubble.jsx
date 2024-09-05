import { Box, ListItemText, ListItem } from '@mui/material';

function ChatBubble({ message, isUserMessage }) {
    return (
        <ListItem
            sx={{ display: 'flex', justifyContent: isUserMessage ? 'flex-end' : 'flex-start' }}
        >
            <Box
                sx={{
                    maxWidth: '60%',
                    p: 1,
                    borderRadius: 2,
                    bgcolor: isUserMessage ? 'primary.dark' : 'secondary.dark',
                    textAlign: isUserMessage ? 'right' : 'left'
                }}
            >
                <ListItemText primary={message} />
            </Box>
        </ListItem>
    );
}

export default ChatBubble;
