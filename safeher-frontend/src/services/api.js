import axios from 'axios';
import toast from 'react-hot-toast';

// Base URL configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
          const { token, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Show error toast for non-401 errors
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(error.message);
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  changePassword: async (data) => {
    const response = await api.put('/auth/change-password', data);
    return response.data;
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/auth/refresh', { refreshToken });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  },
};

// User API
export const userAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },
};

// SOS API
export const sosAPI = {
  create: async (data) => {
    const response = await api.post('/sos', data);
    return response.data;
  },

  getHistory: async (params = {}) => {
    const response = await api.get('/sos/history', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/sos/${id}`);
    return response.data;
  },

  resolve: async (id) => {
    const response = await api.put(`/sos/${id}/resolve`);
    return response.data;
  },

  cancel: async (id, reason = '') => {
    const response = await api.put(`/sos/${id}/cancel`, { reason });
    return response.data;
  },
};

// Contacts API
export const contactsAPI = {
  getAll: async () => {
    const response = await api.get('/contacts');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/contacts', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/contacts/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },

  setPrimary: async (id) => {
    const response = await api.put(`/contacts/${id}/primary`);
    return response.data;
  },
};

// Notifications API
export const notificationsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/notifications', { params });
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  clearAll: async () => {
    const response = await api.delete('/notifications/clear-all');
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },
};

// Location API
export const locationAPI = {
  save: async (data) => {
    const response = await api.post('/location', data);
    return response.data;
  },

  getHistory: async (params = {}) => {
    const response = await api.get('/location/history', { params });
    return response.data;
  },

  getLatest: async () => {
    const response = await api.get('/location/latest');
    return response.data;
  },

  share: async (data) => {
    const response = await api.post('/location/share', data);
    return response.data;
  },
};

// Admin API (Combined endpoints for admin dashboard)
export const adminAPI = {
  getStatistics: async () => {
    try {
      const [users, sos, contacts] = await Promise.all([
        userAPI.getStats(),
        sosAPI.getHistory({ limit: 1 }),
        contactsAPI.getAll(),
      ]);
      
      return {
        success: true,
        data: {
          totalUsers: users.data?.users?.total || 0,
          activeUsers: users.data?.users?.active || 0,
          totalSOSAlerts: users.data?.sos?.total || 0,
          activeSOSAlerts: users.data?.sos?.active || 0,
          resolvedSOSAlerts: users.data?.sos?.resolved || 0,
          totalContacts: users.data?.contacts?.total || 0,
        }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  resolveSOS: async (id) => {
    return sosAPI.resolve(id);
  },

  getUsers: async (params) => {
    return userAPI.getAll(params);
  },

  deleteUser: async (id) => {
    return userAPI.delete(id);
  },
};

export default {
  authAPI,
  userAPI,
  sosAPI,
  contactsAPI,
  notificationsAPI,
  locationAPI,
  adminAPI,
};