import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export default {
  async criarConta(username, email, password) {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  },

  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Retorna os dados do usuário e token
  }
};
