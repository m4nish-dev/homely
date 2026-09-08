import api from './axios';

const paymentService = {
  createOrder: async (bookingId) => {
    const response = await api.post('/payments/create-order', { bookingId });
    return response.data;
  },
  verify: async (paymentData) => {
    const response = await api.post('/payments/verify', paymentData);
    return response.data;
  },
};

export default paymentService;
