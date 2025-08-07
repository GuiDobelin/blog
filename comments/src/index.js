const express = require('express');
const { sequelize } = require('../models');
const app = express();
const PORT = process.env.PORT || 3003;
require('dotenv').config();


app.use(express.json());

const commentRoutes = require('../src/routes/commentRoutes');
app.use('/comments', commentRoutes);

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