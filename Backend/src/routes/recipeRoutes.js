const express = require('express');
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth'); // Middleware de autenticação
const multer = require('multer');
const path = require('path');

const router = express.Router();

// 🖼 Configuração do `multer` para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define a pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Gera um nome único para o arquivo
  }
});

const upload = multer({ storage });

// 📌 Rotas protegidas (precisam de login)
router.post('/', auth, upload.single('imagem'), recipeController.create);
router.put('/:id', auth, upload.single('imagem'), recipeController.update);
router.delete('/:id', auth, recipeController.remove);

// 📌 Rotas públicas (qualquer um pode ver receitas)
router.get('/', recipeController.list);
router.get('/:id', recipeController.getDetails);

module.exports = router;
