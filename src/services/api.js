import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH API ============
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  },

  // src/services/api.js
  login: async (email, password) => {
    // Make sure you are sending email AND password
    const response = await api.post('/auth/login', { email, password });
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  },
  // login: async (email, password) => {
  //   const response = await api.post('/auth/login', { email, password });
  //   if (response.success) {
  //     localStorage.setItem('token', response.data.token);
  //     localStorage.setItem('user', JSON.stringify(response.data));
  //   }
  //   return response;
  // },

  getProfile: async () => {
    return await api.get('/auth/me');
  },

  updateProfile: async (userData) => {
    return await api.put('/auth/profile', userData);
  },

  changePassword: async (currentPassword, newPassword) => {
    return await api.put('/auth/change-password', { currentPassword, newPassword });
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
};

// ============ CONTACTS API ============
export const contactsAPI = {
  getAll: async () => {
    return await api.get('/contacts');
  },

  create: async (contactData) => {
    return await api.post('/contacts', contactData);
  },

  update: async (id, contactData) => {
    return await api.put(`/contacts/${id}`, contactData);
  },

  delete: async (id) => {
    return await api.delete(`/contacts/${id}`);
  },
};

// ============ SOS API ============
export const sosAPI = {
  create: async (locationData) => {
    return await api.post('/sos', locationData);
  },

  getHistory: async () => {
    return await api.get('/sos/history');
  },

  getById: async (id) => {
    return await api.get(`/sos/${id}`);
  },

  resolve: async (id) => {
    return await api.put(`/sos/${id}/resolve`);
  },
};

// ============ NOTIFICATIONS API ============
export const notificationsAPI = {
  getAll: async () => {
    return await api.get('/notifications');
  },

  markAsRead: async (id) => {
    return await api.put(`/notifications/${id}/read`);
  },

  markAllAsRead: async () => {
    return await api.put('/notifications/read-all');
  },
};

// ============ ADMIN API ============
export const adminAPI = {
  getUsers: async () => {
    return await api.get('/admin/users');
  },

  getSOSAlerts: async () => {
    return await api.get('/admin/sos');
  },

  getActiveSOS: async () => {
    return await api.get('/admin/sos/active');
  },

  getStatistics: async () => {
    return await api.get('/admin/statistics');
  },

  resolveSOS: async (id) => {
    return await api.put(`/admin/sos/${id}/resolve`);
  },
};

// Health check
export const getHealth = async () => {
  return await api.get('/health');
};

export default api;