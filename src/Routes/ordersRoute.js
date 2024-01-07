const express = require('express');
const { dbQueryWithData } = require('../helper');

const tableName = 'orders';

const orderRouter = express();

// POST  sukuria uzsakyma

orderRouter.post('/', async (req, res) => {
  const {
    user_id: userId,
    shop_item_id: shopItemId,
    quantity,
    total_price: totalPrice,
    status,
  } = req.body;
  const argArr = [userId, shopItemId, quantity, totalPrice, status];
  const sql = `INSERT INTO ${tableName} ( user_id, shop_item_id, quantity, total_price, status) VALUES (?,?,?,?,?)`;
  const [rows, error] = await dbQueryWithData(sql, argArr);
  console.log('argArr ===', argArr);
  if (error) {
    console.log('error ===', error);
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  res.status(201).json(rows);
});

module.exports = orderRouter;
