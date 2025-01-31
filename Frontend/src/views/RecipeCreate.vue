<template>
  <div>
    <h2>Criar Receita</h2>
    <form @submit.prevent="criarReceita">
      <label for="nome">Nome da Receita</label>
      <input type="text" id="nome" v-model="receita.nome" required />

      <label for="categoria">Categoria</label>
      <select id="categoria" v-model="receita.categoria" required>
        <option value="">Selecione uma categoria</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <label for="etapas">Modo de Preparo</label>
      <textarea id="etapas" v-model="receita.etapas" required></textarea>

      <label for="imagem">Imagem da Receita</label>
      <input type="file" id="imagem" @change="processarImagem" accept="image/*" />

      <!-- Preview da Imagem -->
      <img v-if="receita.imagem" :src="receita.imagem" alt="Pré-visualização" class="preview-image" />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Salvando...' : 'Salvar' }}
      </button>
      <button type="button" class="btn-cancel" @click="$router.push('/')">Cancelar</button>
    </form>
  </div>
</template>

<script>
import recipeService from '@/services/recipeService';

export default {
  data() {
    return {
      receita: {
        nome: '',
        categoria: '',
        etapas: '',
        imagem: '' // Base64 armazenada aqui
      },
      categorias: ["Entradas", "Lanches", "Tapas", "Pratos Principais", "Sobremesa", "Drinks"],
      loading: false // Para evitar múltiplos cliques no botão de salvar
    };
  },
  methods: {
    async criarReceita() {
      if (this.loading) return; // Evita cliques duplos

      try {
        this.loading = true;
        await recipeService.criarReceita(this.receita);

        // Limpa os campos após o envio bem-sucedido
        this.receita = { nome: '', categoria: '', etapas: '', imagem: '' };

        this.$router.push('/');
      } catch (error) {
        console.error('Erro ao criar receita:', error);
      } finally {
        this.loading = false;
      }
    },
    processarImagem(event) {
      const file = event.target.files[0];
      if (!file) return;

      // 🔹 Valida se o arquivo é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem válido.');
        return;
      }

      // 🔹 Valida tamanho máximo (exemplo: 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.receita.imagem = reader.result; // Converte para Base64
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
.preview-image {
  max-width: 200px;
  margin-top: 10px;
  border-radius: 5px;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
