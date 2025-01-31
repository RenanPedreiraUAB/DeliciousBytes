const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referência ao modelo 'User'
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  etapas: {
    type: String,
    required: true
  },
  imagem: {
    type: String // Pode ser uma URL local (`/uploads/...`) ou Base64
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
