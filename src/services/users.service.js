import axios from 'axios';

class UsersService {
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

  getUser = () => {
    return this.api.get('/api/users/');
  };

  updateUser = (requestBody) => {
    return this.api.put('/api/users/', requestBody);
  };

}

const usersService = new UsersService();

export default usersService;
