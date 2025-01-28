const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const recipeRoutes = require('./src/routes/recipeRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Conexão ao MongoDB (ajuste conforme a sua configuração)
mongoose.connect('mongodb://localhost:27017/delicious_bytes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro de conexão ao MongoDB:', err));

// Rota inicial de teste
app.get('/', (req, res) => {
  res.send('Delicious Bytes API - Rotas em funcionamento!');
});

// Montar rotas
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
