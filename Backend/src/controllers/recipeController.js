const recipeService = require('../services/recipeService');

module.exports = {
  // Criar receita
  async create(req, res) {
    try {
      const userId = req.userId; // recuperado através de middleware de autenticação, p.ex.
      const { nome, categoria, etapas, imagem } = req.body;

      // Enviar para o service
      const newRecipe = await recipeService.createRecipe({
        nome,
        categoria,
        etapas,
        imagem,
        autor: userId
      });

      return res.status(201).json({
        message: 'Recipe created successfully',
        recipe: newRecipe
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Listar receitas (com filtros opcionais)
  async list(req, res) {
    try {
      const { nome, autor, categoria } = req.query;

      // Montar objeto de filtros (pode ser feito no service também)
      const filters = {};
      if (nome) filters.nome = new RegExp(nome, 'i');
      if (autor) filters.autor = autor;
      if (categoria) filters.categoria = categoria;

      const recipes = await recipeService.getAllRecipes(filters);

      return res.status(200).json(recipes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obter detalhes de uma receita específica
  async getDetails(req, res) {
    try {
      const { id } = req.params;
      const recipe = await recipeService.getRecipeById(id);
      return res.status(200).json(recipe);
    } catch (error) {
      // Se a receita não for encontrada, retornará 404
      return res.status(404).json({ error: error.message });
    }
  },

  // Editar receita
  async update(req, res) {
    try {
      const userId = req.userId;  // assumindo middleware de autenticação
      const { id } = req.params;
      const updateData = req.body;

      const updatedRecipe = await recipeService.updateRecipe(id, updateData, userId);

      return res.status(200).json({
        message: 'Recipe updated successfully',
        recipe: updatedRecipe
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Remover receita
  async remove(req, res) {
    try {
      const userId = req.userId; // assumindo middleware
      const { id } = req.params;

      await recipeService.deleteRecipe(id, userId);

      return res.status(200).json({
        message: 'Recipe deleted successfully'
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};
