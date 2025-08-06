const express = require('express');
const { sequelize } = require('./models');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use('/posts', postRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados com sucesso.');

    await sequelize.sync();
    console.log('Tabelas sincronizadas com sucesso.');

    console.log(`posts rodando na porta ${PORT}`);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
});
