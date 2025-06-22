import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthService } from '../services/authService';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authService = AuthService.getInstance();

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedRefreshToken = localStorage.getItem('refreshToken');
    const savedUser = localStorage.getItem('authUser');

    if (savedToken && savedUser && savedRefreshToken) {
      try {
        setToken(savedToken);
        setRefreshToken(savedRefreshToken);
        setUser(JSON.parse(savedUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
      } catch (error) {
        console.error('Erreur parsing user data:', error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await authService.login({ email, password });
      if (result.success && result.user && result.token && result.refreshToken) {
        setToken(result.token);
        setRefreshToken(result.refreshToken);
        setUser(result.user);
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('authUser', JSON.stringify(result.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authUser');
    delete axios.defaults.headers.common['Authorization'];
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const userData = await authService.getCurrentUser(token);
      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Erreur refreshUser:', error);
      logout();
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) return false;
    try {
      const { token } = await authService.refreshToken(refreshToken);
      setToken(token);
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } catch (error) {
      console.error('Erreur refreshAccessToken:', error);
      logout();
      return false;
    }
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            error.config.headers['Authorization'] = `Bearer ${token}`;
            return axios(error.config);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [token, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, refreshUser, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}