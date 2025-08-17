// ... existing code ...

import api from "./services/api";

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
  
  // ... existing code ...