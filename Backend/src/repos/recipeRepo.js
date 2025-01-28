const Recipe = require('../models/Recipe');

module.exports = {
  /**
   * Cria uma nova receita
   * @param {Object} recipeData Dados da receita
   * @returns recipe criada
   */
  async createRecipe(recipeData) {
    return await Recipe.create(recipeData);
  },

  /**
   * Busca uma receita pelo ID (populando autor, caso necessário)
   * @param {string} recipeId
   * @returns recipe ou null
   */
  async findRecipeById(recipeId) {
    return await Recipe.findById(recipeId).populate('autor', 'username');
  },

  /**
   * Lista receitas com base em filtros
   * @param {Object} filters
   * @returns array de receitas
   */
  async findAllRecipes(filters) {
    return await Recipe.find(filters).populate('autor', 'username');
  },

  /**
   * Atualiza dados de uma receita
   * @param {string} recipeId
   * @param {Object} updateData
   * @returns recipe atualizada
   */
  async updateRecipe(recipeId, updateData) {
    return await Recipe.findByIdAndUpdate(recipeId, updateData, { new: true });
  },

  /**
   * Remove uma receita
   * @param {string} recipeId
   * @returns recipe removida
   */
  async deleteRecipe(recipeId) {
    return await Recipe.findByIdAndDelete(recipeId);
  }
};
