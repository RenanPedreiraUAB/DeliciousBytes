<template>
  <div>
    <h2>Receitas</h2>

    <!-- 🔍 Barra de Pesquisa -->
    <div class="filters">
      <input v-model="filters.nome" placeholder="Pesquisar por nome" />
      <input v-model="filters.autor" placeholder="Pesquisar por autor" />
      <select v-model="filters.categoria">
        <option value="">Todas as categorias</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <button @click="buscarReceitas">Pesquisar</button> <!-- ✅ AGORA FAZ REQUISIÇÃO HTTP -->
      <button @click="$router.push('/recipe-create')">+ Criar Nova Receita</button>
    </div>

    <!-- 📋 Listagem de Receitas -->
    <div class="recipe-list">
      <div v-for="recipe in receitas" :key="recipe._id" class="recipe-item">
        <div class="recipe-main">
          <strong class="recipe-name">{{ recipe.nome }}</strong>
          <span class="recipe-category">{{ recipe.categoria }}</span>
        </div>

        <div class="actions">
          <button v-if="userId === recipe.autor._id" @click="$router.push(`/recipe-edit/${recipe._id}`)">Editar</button>
          <button v-if="userId === recipe.autor._id" @click="apagarReceita(recipe._id)">Apagar</button>
          <button @click="$router.push(`/recipe/${recipe._id}`)">Ver</button> <!-- SEMPRE À DIREITA -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import recipeService from '@/services/recipeService';

export default {
  data() {
    return {
      receitas: [],
      filters: {
        nome: '',
        autor: '',
        categoria: ''
      },
      categorias: ["Entradas", "Lanches", "Tapas", "Pratos Principais", "Sobremesa", "Drinks"],
      userId: localStorage.getItem('userId') || null
    };
  },
  methods: {
    async buscarReceitas() {
      try {
        // ✅ Agora busca diretamente do backend com os filtros aplicados
        this.receitas = await recipeService.listarReceitas(this.filters);
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
      }
    },
    async apagarReceita(id) {
      if (confirm('Tem certeza que deseja apagar esta receita?')) {
        try {
          await recipeService.apagarReceita(id);
          this.buscarReceitas();
        } catch (error) {
          console.error('Erro ao apagar receita:', error);
        }
      }
    }
  },
  async mounted() {
    this.buscarReceitas();
  }
};
</script>
