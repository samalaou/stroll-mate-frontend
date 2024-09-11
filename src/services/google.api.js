import axios from 'axios';


class GoogleService {
    constructor() {
      this.api = axios.create({
        baseURL: 'https://maps.googleapis.com/maps/api',
      });
  
      this.api.interceptors.request.use(config => {
        const apiKey = 'AIzaSyAVyqwVLVp8xqyW-4_kSrq_nEzCcQKIOZc';
  
        if (apiKey) {
          config.params = { ...config.params, key: apiKey };
        }
  
        return config;
      });
    }
  
    async getCoordinates(address) {
      try {
        const response = await this.api.get('/geocode/json', {
          params: {
            address,
          },
        });
  
        return response.data.results[0]?.geometry?.location;
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
      }
    }
  }
  
  const googleService = new GoogleService

  export default googleService