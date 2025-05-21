import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw error;
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response from server. Please check your connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error('An error occurred while setting up the request.');
  }
};

export const clientService = {
  async getClients(page = 1, limit = 10, search = '') {
    try {
      const response = await axios.get(`${API_URL}/clients`, {
        headers: getAuthHeader(),
        params: { page, limit, search }
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async getClient(id) {
    try {
      const response = await axios.get(`${API_URL}/clients/${id}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async createClient(clientData) {
    try {
      const response = await axios.post(`${API_URL}/clients`, clientData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async updateClient(id, clientData) {
    try {
      const response = await axios.put(`${API_URL}/clients/${id}`, clientData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async deleteClient(id) {
    try {
      const response = await axios.delete(`${API_URL}/clients/${id}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}; 