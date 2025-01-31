<template>
  <div>
    <h2>Editar Receita</h2>
    <form @submit.prevent="editarReceita">
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
        {{ loading ? "Salvando..." : "Salvar Alterações" }}
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
        imagem: '',
      },
      categorias: ["Entradas", "Lanches", "Tapas", "Pratos Principais", "Sobremesa", "Drinks"],
      loading: false
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      this.receita = await recipeService.buscarReceitaPorId(id);
    } catch (error) {
      console.error("Erro ao carregar receita:", error);
    }
  },
  methods: {
    async editarReceita() {
      if (this.loading) return;
      try {
        this.loading = true;
        await recipeService.editarReceita(this.receita._id, this.receita);
        this.$router.push('/');
      } catch (error) {
        console.error('Erro ao editar receita:', error);
      } finally {
        this.loading = false;
      }
    },
    processarImagem(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem válido.');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxWidth = 800;
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // 🔹 Convertendo para JPEG Base64 para economizar espaço
          this.receita.imagem = canvas.toDataURL("image/jpeg", 0.7);
          console.log("Imagem processada para Base64:", this.receita.imagem.length);
        };
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
