import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Health & DB Info
export const getHealthStatus = async () => {
  const response = await api.get('/health');
  return response.data;
};

// 2. User Dashboard Aggregation Stats
export const getUserStats = async () => {
  const response = await api.get('/users/stats');
  return response.data;
};

// 3. User CRUD API Endpoints

// GET /api/users (with req.query parameters)
export const getUsers = async (params = {}) => {
  const response = await api.get('/users', { params });
  return response.data;
};

// GET /api/users/:id (with req.params.id)
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// POST /api/users (with req.body - CREATE)
export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// PUT /api/users/:id (with req.params.id & req.body - UPDATE)
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// PATCH /api/users/:id (with req.params.id & req.body - PATCH)
export const patchUser = async (id, fieldsToUpdate) => {
  const response = await api.patch(`/users/${id}`, fieldsToUpdate);
  return response.data;
};

// DELETE /api/users/:id (with req.params.id - DELETE)
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// 4. Topic Demos
export const runBlockingDemo = async (mode = 'non-blocking') => {
  const response = await api.get('/demo/blocking-vs-nonblocking', { params: { mode } });
  return response.data;
};

export const runClosureDemo = async () => {
  const response = await api.get('/demo/closures');
  return response.data;
};

export const getModulesInfo = async () => {
  const response = await api.get('/demo/modules-info');
  return response.data;
};

export const getServerArchitecture = async () => {
  const response = await api.get('/demo/server-architecture');
  return response.data;
};

export default api;
