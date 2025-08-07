const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const { sequelize } = require('../models');


app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;
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


