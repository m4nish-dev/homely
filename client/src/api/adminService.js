import api from './axios';

const adminService = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  updateUserRole: async (userId, role) => {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
  togglePropertyFeatured: async (propertyId) => {
    const response = await api.put(`/admin/properties/${propertyId}/feature`);
    return response.data;
  },
  togglePropertyActive: async (propertyId) => {
    const response = await api.put(`/admin/properties/${propertyId}/active`);
    return response.data;
  }
};

export default adminService;
