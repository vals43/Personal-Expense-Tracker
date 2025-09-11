import axios from 'axios';
import { getToken } from './authService';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur de requêtes (inchangé)
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur de réponses
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.error('Token invalide ou expiré. Redirection vers la page de connexion.');

            localStorage.removeItem('jwtToken'); 

            if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
                window.location.href = '/login';
            }

            return { data: null, status: 200, statusText: 'Redirecting...' };
        }
        return Promise.reject(error);
    }
);

export default apiClient;