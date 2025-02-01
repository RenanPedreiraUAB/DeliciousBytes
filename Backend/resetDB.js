const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/delicious_bytes';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Conectado ao MongoDB.');
  console.log('Apagando todos os dados da base de dados...');

  await mongoose.connection.db.dropDatabase();

  console.log('🗑️ Base de dados limpa com sucesso!');
  process.exit();
}).catch(err => {
  console.error('Erro ao limpar o banco:', err);
  process.exit(1);
});
