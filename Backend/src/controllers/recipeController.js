const recipeService = require('../services/recipeService');

module.exports = {
  // Criar receita
  async create(req, res) {
    try {
      const userId = req.userId; // ID do usuário autenticado
      const { nome, categoria, etapas, imagemBase64 } = req.body;

      // O frontend enviará a imagem diretamente como Base64 no campo `imagemBase64`
      const newRecipe = await recipeService.createRecipe({
        nome,
        categoria,
        etapas,
        imagem: imagemBase64 || null, // Armazena a imagem Base64 ou null
        autor: userId
      });

      return res.status(201).json({
        message: 'Receita criada com sucesso!',
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
      const userId = req.userId;
      const { id } = req.params;
      const { imagemBase64, ...updateData } = req.body;

      // Se houver uma nova imagem em Base64, substitui a existente
      if (imagemBase64) {
        updateData.imagem = imagemBase64;
      }

      const updatedRecipe = await recipeService.updateRecipe(id, updateData, userId);

      return res.status(200).json({
        message: 'Receita atualizada com sucesso!',
        recipe: updatedRecipe
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Remover receita
  async remove(req, res) {
    try {
      const userId = req.userId;
      const { id } = req.params;

      await recipeService.deleteRecipe(id, userId);

      return res.status(200).json({
        message: 'Receita removida com sucesso!'
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};
