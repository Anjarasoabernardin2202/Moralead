import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class AuthService {
  static instance = null;

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login({ email, password }) {
    try {
      console.log('Attempting login to:', `${API_URL}/api/auth/login`);
      console.log('Request payload:', { email, password });
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur AuthService login:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: `${API_URL}/api/auth/login`
      });
      throw new Error(error.response?.data?.error || 'Erreur de connexion au serveur');
    }
  }

  async getCurrentUser(token) {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur AuthService getCurrentUser:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors de la récupération de l\'utilisateur');
    }
  }

  async refreshToken(refreshToken) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/refresh-token`, { refreshToken });
      return response.data;
    } catch (error) {
      console.error('Erreur AuthService refreshToken:', error);
      throw new Error(error.response?.data?.error || 'Erreur lors du rafraîchissement du token');
    }
  }
}

export { AuthService };