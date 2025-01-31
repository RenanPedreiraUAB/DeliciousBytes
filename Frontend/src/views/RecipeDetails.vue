<template>
  <div class="recipe-details">
    <div class="recipe-card">
      <!-- 🔹 Botão de Voltar agora alinhado à direita -->
      <button class="back-button" @click="$router.push('/')">← Voltar</button>

      <h2>{{ receita.nome }}</h2>
      <p class="recipe-meta">
        Por: <strong>{{ receita.autor?.username }}</strong> | Criado em: {{ formatarData(receita.createdAt) }}
      </p>

      <img v-if="receita.imagem" :src="receita.imagem" alt="Imagem da Receita" class="recipe-image" />

      <h3>Modo de Preparo</h3>
      <p>{{ receita.etapas }}</p>
    </div>
  </div>
</template>

<script>
import recipeService from '@/services/recipeService';

export default {
  data() {
    return {
      receita: null
    };
  },
  created() {
    this.carregarReceita(this.$route.params.id);
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(novoId) {
        this.carregarReceita(novoId);
      }
    }
  },
  methods: {
    async carregarReceita(id) {
      try {
        this.receita = await recipeService.buscarReceitaPorId(id);
      } catch (error) {
        console.error("Erro ao carregar a receita:", error);
      }
    },
    formatarData(data) {
      return new Date(data).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.recipe-details {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.recipe-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 600px;
  position: relative;
}

/* 🔹 Ajusta o botão "Voltar" para a direita */
.back-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
}

.recipe-meta {
  color: gray;
  font-size: 14px;
  margin-bottom: 1rem;
}

.recipe-image {
  max-width: 100%;
  border-radius: 5px;
  margin: 20px 0;
}
</style>
