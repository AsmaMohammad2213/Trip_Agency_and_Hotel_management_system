import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const auth = {
  register: async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  adminLogin: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/admin/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAdmin', 'true');
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Hotels API calls
export const hotels = {
  getAll: async () => {
    const response = await api.get('/hotels');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
  },

  create: async (hotelData: any) => {
    const response = await api.post('/hotels', hotelData);
    return response.data;
  },

  update: async (id: string, hotelData: any) => {
    const response = await api.put(`/hotels/${id}`, hotelData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/hotels/${id}`);
    return response.data;
  },
};

// Bookings API calls
export const bookings = {
  getAll: async () => {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  create: async (bookingData: any) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  cancel: async (id: string) => {
    const response = await api.post(`/bookings/${id}/cancel`);
    return response.data;
  },
};

// Destinations API calls
export const destinations = {
  getAll: async () => {
    const response = await api.get('/destinations');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  },

  create: async (destinationData: any) => {
    const response = await api.post('/destinations', destinationData);
    return response.data;
  },

  update: async (id: string, destinationData: any) => {
    const response = await api.put(`/destinations/${id}`, destinationData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/destinations/${id}`);
    return response.data;
  },
};

export default api; 