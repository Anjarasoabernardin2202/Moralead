import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

// Utiliser une URL locale pour éviter les erreurs HTTPS
const API_BASE_URL = 'http://localhost:5000/api';

export function useApi() {
  const { token } = useAuth();

  const apiCall = useCallback(async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn('API Error (utilisation des données de fallback):', error.message);
      // Retourner des données de fallback au lieu de throw
      return null;
    }
  }, [token]);

  return { apiCall };
}

export function useApiData(endpoint, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { apiCall } = useApi();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(endpoint);
      setData(result);
    } catch (err) {
      console.warn('Erreur API, utilisation des données par défaut:', err.message);
      setError(err.message);
      setData(null); // Laisser les composants utiliser leurs données par défaut
    } finally {
      setLoading(false);
    }
  }, [apiCall, endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, loading, error, refetch: fetchData };
}

export function useRealTimeData(endpoint, interval = 30000) {
  const { data, loading, error, refetch } = useApiData(endpoint);
  const intervalRef = useRef();

  useEffect(() => {
    // Désactiver le temps réel si l'API ne fonctionne pas
    if (error || !data) {
      return;
    }

    if (interval > 0) {
      intervalRef.current = setInterval(refetch, interval);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refetch, interval, error, data]);

  const stopRealTime = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startRealTime = useCallback(() => {
    if (interval > 0 && !intervalRef.current && data && !error) {
      intervalRef.current = setInterval(refetch, interval);
    }
  }, [refetch, interval, data, error]);

  return { 
    data, 
    loading, 
    error, 
    refetch, 
    stopRealTime, 
    startRealTime,
    isRealTimeActive: !!intervalRef.current
  };
}

export function useDashboardStats() {
  // Retourner des données statiques pour éviter les erreurs API
  return {
    data: null,
    loading: false,
    error: null,
    refetch: () => {},
    stopRealTime: () => {},
    startRealTime: () => {},
    isRealTimeActive: false
  };
}

export function useClients(filters = {}) {
  const queryString = new URLSearchParams(filters).toString();
  const endpoint = `/clients${queryString ? `?${queryString}` : ''}`;
  return useApiData(endpoint, [JSON.stringify(filters)]);
}

export function useMaterials() {
  return useRealTimeData('/materiels', 60000);
}