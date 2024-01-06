const mysql = require('mysql2/promise');

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
// console.log('dbConfig ===', dbConfig);

module.exports = {
  dbConfig,
};
