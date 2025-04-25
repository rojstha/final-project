const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME,
  logging: console.log // ✅ this will show SQL commands

});

module.exports = sequelize;
