import axios from 'axios';

class MessageService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  getUserMessages = (otherUserId) => {
    return this.api.get('/api/messages', {
      params: { userId: otherUserId }
    });
  };
  
  createMessage = (requestBody) => {
    return this.api.post(`/api/messages/`, requestBody);
  };

  getChats = () => {
    return this.api.get('/api/messages/chats');
  };
}

const messageService = new MessageService();

export default messageService;
