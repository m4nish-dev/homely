import api from './axios';

const reviewService = {
  create: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
  getForProperty: async (propertyId, page = 1) => {
    const response = await api.get(`/reviews/property/${propertyId}?page=${page}`);
    return response.data;
  },
};

export default reviewService;
