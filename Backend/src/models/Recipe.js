const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // referência ao modelo 'User'
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
    type: String // pode ser base64 ou URL
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
