const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);


const User = require('./user.js')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  User
};

module.exports = db;
