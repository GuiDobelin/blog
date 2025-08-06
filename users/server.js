require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');

app.use(express.json());

const authRoutes = require('./src/routes/auth');

app.use('/auth', authRoutes);
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Banco sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao sincronizar o banco:', err);
});
