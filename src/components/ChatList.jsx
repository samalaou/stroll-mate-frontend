import { List, ListItem, ListItemText, Divider } from '@mui/material';

const ChatList = ({ users, onSelectUser, selectedUserId }) => {
    return (
        <List>
            {users.map((user) => (
                <div key={user._id}>
                    <ListItem
                        button
                        selected={user._id === selectedUserId}
                        onClick={() => onSelectUser(user)}
                    >
                        <ListItemText primary={user.username} />
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    );
};

export default ChatList;
