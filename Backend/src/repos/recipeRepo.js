const Recipe = require('../models/Recipe');

module.exports = {
  /**
   * Cria uma nova receita e armazena a imagem diretamente como Base64.
   * @param {Object} recipeData Dados da receita (nome, categoria, etapas, imagem, autor, etc.)
   */
  async createRecipe(recipeData) {
    return await Recipe.create(recipeData);
  },

  /**
   * Busca uma receita pelo ID, populando o autor.
   * @param {string} recipeId
   * @returns {Object} Receita encontrada ou `null`
   */
  async findRecipeById(recipeId) {
    return await Recipe.findById(recipeId).populate('autor', 'username');
  },

  /**
   * Lista receitas com base em filtros, garantindo que a imagem seja retornada corretamente.
   * @param {Object} filters Filtros de pesquisa (nome, categoria, etc.)
   * @returns {Array} Lista de receitas filtradas
   */
  async findAllRecipes(filters) {
    return await Recipe.find(filters)
      .populate('autor', 'username')
      .lean() // Garante que os dados sejam retornados no formato puro de objeto
      .then((recipes) => {
        return recipes.map(recipe => ({
          ...recipe,
          imagem: recipe.imagem || null // Garante que a imagem seja sempre retornada
        }));
      });
  },

  /**
   * Atualiza os dados de uma receita existente.
   * @param {string} recipeId ID da receita a ser atualizada
   * @param {Object} updateData Dados de atualização (incluindo imagem Base64)
   * @returns {Object} Receita atualizada
   */
  async updateRecipe(recipeId, updateData) {
    return await Recipe.findByIdAndUpdate(recipeId, updateData, { new: true });
  },

  /**
   * Remove uma receita pelo ID.
   * @param {string} recipeId ID da receita a ser removida
   * @returns {Object} Receita removida
   */
  async deleteRecipe(recipeId) {
    return await Recipe.findByIdAndDelete(recipeId);
  }
};
