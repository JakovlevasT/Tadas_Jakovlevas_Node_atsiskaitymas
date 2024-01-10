const express = require('express');
const { dbQueryWithData } = require('../helper');

const itemTypeRoute = express.Router();
const tablename = 'item_types';

itemTypeRoute.get('/', async (req, res) => {
  const sql = `SELECT * FROM ${tablename}`;
  const [rows, error] = await dbQueryWithData(sql);

  if (error) {
    res.status(500).json('Something went wrong');
    return;
  }
  res.status(200).json(rows);
});

module.exports = itemTypeRoute;
