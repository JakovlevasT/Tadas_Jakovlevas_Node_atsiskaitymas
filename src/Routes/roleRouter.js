const express = require('express');
const { dbQueryWithData } = require('../helper');

const roleRouter = express.Router();

const tableName = 'user_roles';

// GET visas roles

roleRouter.get('/', async (req, res) => {
  const sql = `SELECT * FROM ${tableName}`;
  const [rows, error] = await dbQueryWithData(sql);

  if (error) {
    console.log('error ===', error);
    res.status(500).json('Something went wrong');
    return;
  }
  res.status(200).json(rows);
});

module.exports = roleRouter;
