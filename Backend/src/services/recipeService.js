const recipeRepo = require('../repos/recipeRepo');

module.exports = {
  /**
   * Cria uma nova receita.
   * @param {Object} recipeData Dados da receita (nome, categoria, etapas, imagem, autor, etc.)
   */
  async createRecipe(recipeData) {
    // Poderia validar dados obrigatórios aqui,
    // ou verificar se o autor existe, caso seja necessário.
    return await recipeRepo.createRecipe(recipeData);
  },

  /**
   * Retorna uma lista de receitas, com filtros opcionais.
   * @param {Object} filters Filtros de pesquisa (nome, autor, categoria, etc.)
   */
  async getAllRecipes(filters) {
    return await recipeRepo.findAllRecipes(filters);
  },

  /**
   * Retorna os detalhes de uma receita específica, ou lança erro se não encontrada.
   * @param {string} recipeId ID da receita (ObjectId no MongoDB)
   */
  async getRecipeById(recipeId) {
    const recipe = await recipeRepo.findRecipeById(recipeId);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    return recipe;
  },

  /**
   * Atualiza uma receita, verificando se o userId é o autor da receita.
   * @param {string} recipeId ID da receita
   * @param {Object} updateData Dados de atualização
   * @param {string} userId ID do utilizador que está a fazer a alteração
   */
  async updateRecipe(recipeId, updateData, userId) {
    // Buscar a receita para verificar o autor
    const recipe = await recipeRepo.findRecipeById(recipeId);
    if (!recipe) {
      throw new Error('Recipe not found');
    }

    // Verificar autorização
    if (recipe.autor._id.toString() !== userId) {
      throw new Error('Not authorized to edit this recipe');
    }

    // Prosseguir com a atualização
    const updatedRecipe = await recipeRepo.updateRecipe(recipeId, updateData);
    return updatedRecipe;
  },

  /**
   * Remove uma receita, verificando se o userId é o autor da receita.
   * @param {string} recipeId ID da receita
   * @param {string} userId ID do utilizador que está a remover
   */
  async deleteRecipe(recipeId, userId) {
    // Buscar a receita para verificar o autor
    const recipe = await recipeRepo.findRecipeById(recipeId);
    if (!recipe) {
      throw new Error('Recipe not found');
    }

    // Verificar autorização
    if (recipe.autor._id.toString() !== userId) {
      throw new Error('Not authorized to edit this recipe');
    }

    return await recipeRepo.deleteRecipe(recipeId);
  }
};
