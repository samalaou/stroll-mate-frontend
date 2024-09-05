import { Box, List } from '@mui/material';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';

const Chat = ({ messages, user, onSendMessage }) => {
    return (
        <Box display="flex" flexDirection="column" flex={1}>
            <List sx={{ flexGrow: 1, overflowY: 'auto', padding: 0 }}>
                {messages.map(message => (
                    <ChatBubble
                        key={message._id}
                        isUserMessage={message.from._id === user._id}
                        message={message.text}
                    />
                ))}
            </List>
            <Box position="sticky" bottom={0} width="100%">
                <MessageInput onSend={onSendMessage} />
            </Box>
        </Box>
    );
};

export default Chat;
