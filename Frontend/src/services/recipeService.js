import axios from 'axios';

const API_URL = 'http://localhost:3000/recipes';

export default {
  async listarReceitas(filtros = {}) {
    try {
      const params = new URLSearchParams(filtros).toString(); // ✅ Converte filtros em query params
      const response = await axios.get(`${API_URL}?${params}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      throw error;
    }
  },
  async buscarReceitaPorId(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  async criarReceita(dados) {
    const token = localStorage.getItem('token');
    
    // 🔄 Verifica se a imagem é um arquivo ou já está em Base64
    const formData = new FormData();
    formData.append('nome', dados.nome);
    formData.append('categoria', dados.categoria);
    formData.append('etapas', dados.etapas);

    if (dados.imagem instanceof File) {
      formData.append('imagem', dados.imagem);
    } else {
      formData.append('imagemBase64', dados.imagem); // Se já for base64
    }

    const response = await axios.post(API_URL, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  },
  async editarReceita(id, dados) {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('nome', dados.nome);
    formData.append('categoria', dados.categoria);
    formData.append('etapas', dados.etapas);

    if (dados.imagem instanceof File) {
      formData.append('imagem', dados.imagem);
    } else {
      formData.append('imagemBase64', dados.imagem);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  },
  async apagarReceita(id) {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
