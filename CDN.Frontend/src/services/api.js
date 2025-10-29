import axios from 'axios';

const API_BASE_URL = 'http://localhost:5238/api/Freelancer';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const freelancerAPI = {
  // Get all freelancers
  getAllFreelancers: async () => {
    const response = await api.get('/ListAll');
    return response.data;
  },

  // Get freelancer by ID
  getFreelancerById: async (userId) => {
    const response = await api.get(`/Get?userId=${userId}`);
    return response.data;
  },

  // Create new freelancer
  createFreelancer: async (freelancerData) => {
    const response = await api.post('/Register', freelancerData);
    return response.data;
  },

  // Update freelancer
  updateFreelancer: async (freelancerData) => {
    const response = await api.put('/Update', freelancerData);
    return response.data;
  },

  // Delete freelancer
  deleteFreelancer: async (userId) => {
    const response = await api.delete(`/Delete?userId=${userId}`);
    return response.data;
  },

  // Search freelancers
  searchFreelancers: async (searchQuery) => {
    const response = await api.get(`/Search?searchQuery=${encodeURIComponent(searchQuery)}`);
    return response.data;
  },

  // Get all freelancers including archived
  getAllFreelancersIncludingArchived: async () => {
    const response = await api.get('/ListAllIncludingArchived');
    return response.data;
  },

  // Archive freelancer
  archiveFreelancer: async (userId) => {
    const response = await api.post(`/Archive?userId=${userId}`);
    return response.data;
  },

  // Unarchive freelancer
  unarchiveFreelancer: async (userId) => {
    const response = await api.post(`/Unarchive?userId=${userId}`);
    return response.data;
  },

  // Toggle archive status
  toggleArchiveStatus: async (userId) => {
    const response = await api.post(`/ToggleArchiveStatus?userId=${userId}`);
    return response.data;
  },
};

export default api;
