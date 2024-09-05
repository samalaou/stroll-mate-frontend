import { Typography, Box, List } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import messageService from '../services/message.service';
import ChatList from '../components/ChatList';
import ChatBubble from '../components/ChatBubble';
import MessageInput from '../components/MessageInput';

function InboxPage() {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await messageService.getChats();
                setUsers(response.data);
            } catch (err) {
                console.log(err);
                setError('Failed to get users.');
            }
        })();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            (async () => {
                try {
                    const response = await messageService.getUserMessages(selectedUser._id);
                    setMessages(response.data);
                } catch (err) {
                    console.log(err);
                    setError('Failed to get messages.');
                }
            })();
        }
    }, [selectedUser, user._id]);
    
    
    const handleSendMessage = async (messageText) => {
        try {
            const requestBody = {
                text: messageText,
                from: user._id,
                to: selectedUser._id
            };
            const response = await messageService.createMessage(requestBody);
            console.log('Message sent:', response.data);
            setMessages(prevMessages => [
                ...prevMessages,
                response.data
            ]);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };
    
    return (
        <Box display="flex" flexDirection="row" height="100vh">
            <Box flex={1} p={2} borderRight={1} borderColor="divider" display="flex" flexDirection="column">
                <ChatList
                    users={users}
                    onSelectUser={setSelectedUser}
                    selectedUserId={selectedUser?._id}
                />
            </Box>
            <Box flex={3} p={2} display="flex" flexDirection="column" height="100%">
                {selectedUser ? (
                    <>
                        {error ? (
                            <Typography color="error">{error}</Typography>
                        ) : (
                            <Box display="flex" flexDirection="column" flex={1}>
                                <List sx={{ flexGrow: 1, overflowY: 'auto', padding: 0 }}>
                                    {messages.map(message => (
                                        <ChatBubble 
                                            key={message._id}
                                            isUserMessage={message.from._id == user._id}
                                            message={message.text}
                                        />
                                    ))}
                                </List>
                                <Box position="sticky" bottom={0} width="100%">
                                    <MessageInput onSend={handleSendMessage} />
                                </Box>
                            </Box>
                        )}
                    </>
                ) : (
                    <Typography variant="h6" color="textSecondary">
                        Select a user to view messages.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default InboxPage;