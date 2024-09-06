import axios from 'axios';

class WalksService {
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


  createWalk = (requestBody) => {
    return this.api.post('/api/walks/', requestBody);
  };

  updateWalk = (walkId, requestBody) => {
    return this.api.put(`/api/walks/${walkId}`, requestBody);
  };

  getWalk = (walkId) => {
    return this.api.get(`/api/walks/${walkId}`);
  };

  deleteWalk = (walkId) => {
    return this.api.delete(`/api/walks/${walkId}`);
  };

  getAllWalks = () => {
    return this.api.get('/api/walks/');
  };
}

const walksService = new WalksService();

export default walksService;
