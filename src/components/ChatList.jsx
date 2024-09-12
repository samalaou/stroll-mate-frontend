import { List, ListItem, ListItemText, Divider } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material/styles';

const ChatList = ({ users, onSelectUser, selectedUserId }) => {
    const theme = useTheme();
    
    return (
        <List>
            {users.map((user) => (
                <div key={user._id}>
                    <ListItem
                        button
                        selected={user._id === selectedUserId}
                        onClick={() => onSelectUser(user)}
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <ListItemText primary={user.username} />
                        <CircleIcon
                            sx={{ color: user.isAvailable ? theme.palette.success.main : theme.palette.error.main }}
                        />
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    );
};

export default ChatList;
