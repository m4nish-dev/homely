import api from './axios';

const propertyService = {
  getAll: async (params) => {
    const response = await api.get('/properties', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },
  checkAvailability: async (id, checkIn, checkOut) => {
    const response = await api.post(`/properties/${id}/availability`, { checkIn, checkOut });
    return response.data;
  },
  getMyProperties: async () => {
    const response = await api.get('/properties/host/my-properties');
    return response.data;
  },
  createProperty: async (formData) => {
    const response = await api.post('/properties', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  }
};

export default propertyService;
