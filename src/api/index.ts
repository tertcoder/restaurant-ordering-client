import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const auth = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  register: async (username: string, password: string, email: string) => {
    const response = await api.post('/auth/register', {
      username,
      password,
      email,
      role: 'CLIENT',
    });
    return response.data;
  },
};

export const menu = {
  getItems: async () => {
    const response = await api.get('/menu');
    return response.data;
  },
  createItem: async (formData: FormData) => {
    const response = await api.post('/menu', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  updateItem: async (id: string, formData: FormData) => {
    const response = await api.put(`/menu/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteItem: async (id: string) => {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
  },
};

export const orders = {
  create: async (order: { userId: string; items: any[] }) => {
    const response = await api.post('/orders', order);
    return response.data;
  },
  getUserOrders: async (userId: string) => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  },
  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  updateStatus: async (orderId: string, status: string) => {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  },
  cancelOrder: async (orderId: string) => {
    const response = await api.patch(`/orders/${orderId}/status`, { status: 'CANCELLED' });
    return response.data;
  },
  updateOrderItems: async (orderId: string, items: any[]) => {
    console.log(items)
    const response = await api.patch(`/orders/${orderId}/items`, { items });
    return response.data;
  }
};