const express = require('express');
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth'); // <- importe o middleware

const router = express.Router();

// Todas as rotas de receita que exigem login usam 'auth'
router.post('/', auth, recipeController.create);
router.put('/:id', auth, recipeController.update);
router.delete('/:id', auth, recipeController.remove);

// Se quiser que a listagem e detalhes sejam públicas, deixe sem middleware
router.get('/', recipeController.list);
router.get('/:id', recipeController.getDetails);

module.exports = router;