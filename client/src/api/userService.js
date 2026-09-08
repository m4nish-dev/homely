import api from './axios';

const userService = {
  getFavorites: async () => {
    const response = await api.get('/users/favorites');
    return response.data;
  },
  addFavorite: async (propertyId) => {
    const response = await api.post('/users/favorites', { propertyId });
    return response.data;
  },
  removeFavorite: async (propertyId) => {
    const response = await api.delete(`/users/favorites/${propertyId}`);
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
  updateAvatar: async (formData) => {
    const response = await api.put('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default userService;
