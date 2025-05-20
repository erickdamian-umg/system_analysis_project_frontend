import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const clientService = {
  async getClients(page = 1, limit = 10, search = '') {
    const response = await axios.get(`${API_URL}/clients`, {
      headers: getAuthHeader(),
      params: { page, limit, search }
    });
    return response.data;
  },

  async getClient(id) {
    const response = await axios.get(`${API_URL}/clients/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async createClient(clientData) {
    const response = await axios.post(`${API_URL}/clients`, clientData, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async updateClient(id, clientData) {
    const response = await axios.put(`${API_URL}/clients/${id}`, clientData, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async deleteClient(id) {
    const response = await axios.delete(`${API_URL}/clients/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
}; 