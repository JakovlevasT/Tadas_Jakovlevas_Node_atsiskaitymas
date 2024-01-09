const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkShopItemsBody } = require('../middleware');

const shopItemRouter = express.Router();
const tableName = 'shop_items';
// POST sukurti parduotuves preke
shopItemRouter.post('/', checkShopItemsBody, async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    item_type_id: itemTypeId,
  } = req.body;
  const argArr = [name, price, description, image, itemTypeId];
  const sql = `INSERT INTO ${tableName} (name, price, description, image, item_type_id) VALUES (?,?,?,?,?)`;
  const [insertResultObj, error] = await dbQueryWithData(sql, argArr);
  console.log('insertResultObj ===', insertResultObj);

  if (error) {
    res.status(500).json({ status: 'error', errors: error });
    return;
  }
  if (insertResultObj.affectedRows === 1) {
    res.status(201).json({ status: 'success', msg: 'Item was created' });
    return;
  }
  res.status(400).json('no rows affected');
});
// GET visas prekes

shopItemRouter.get('/', async (req, res) => {
  const sql = `SELECT * FROM ${tableName} WHERE isDeleted = 0`;
  const [insertResultObj, error] = await dbQueryWithData(sql);

  if (error) {
    res.status(400).json('iskilo klaida');
    return;
  }

  res.json(insertResultObj);
});

// GET gauti preke pagal id
shopItemRouter.get('/:id', async (req, res) => {
  const itemId = +req.params.id;
  const sql = `SELECT * FROM ${tableName} WHERE shop_items_id= ?`;
  const [rows, error] = await dbQueryWithData(sql, [itemId]);

  if (error) {
    res.status(400).json('iskilo klaida');
    return;
  }
  res.json(rows);
});

// DELETE istrinti parduotuves preke pagal id

shopItemRouter.delete('/:id', async (req, res) => {
  const itemId = +req.params.id;
  const sql = `UPDATE ${tableName} SET isDeleted = 1 WHERE shop_items_id = ?`;
  const [rows, error] = await dbQueryWithData(sql, [itemId]);

  if (error) {
    res.status(400).json('iskilo klaida');
    return;
  }
  res.json(rows);
});

module.exports = shopItemRouter;
