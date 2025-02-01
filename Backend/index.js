const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa o CORS
const path = require('path'); // Para servir arquivos estáticos
const userRoutes = require('./src/routes/userRoutes');
const recipeRoutes = require('./src/routes/recipeRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Habilita o CORS para o frontend
app.use(cors({
  origin: 'http://localhost:5173', // Permite chamadas do frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Servir imagens da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexão ao MongoDB
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

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
