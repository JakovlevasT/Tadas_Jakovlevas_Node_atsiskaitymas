const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkOrdersBody } = require('../middleware');

const tableName = 'orders';

const orderRouter = express();

// POST  sukuria uzsakyma

orderRouter.post('/', checkOrdersBody, async (req, res) => {
  const {
    user_id: userId,
    shop_item_id: shopItemId,
    quantity,
    total_price: totalPrice,
    status,
  } = req.body;
  const argArr = [userId, shopItemId, quantity, totalPrice, status];
  const sql = `INSERT INTO ${tableName} ( user_id, shop_item_id, quantity, total_price, status) VALUES (?,?,?,?,?)`;
  // eslint-disable-next-line no-unused-vars
  const [rows, error] = await dbQueryWithData(sql, argArr);
  if (error) {
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  res.status(201).json({ msg: 'Order was added successfuly' });
});

//  GET gauti visus uzsakymus

orderRouter.get('/', async (req, res) => {
  const sql = `SELECT orders.user_id, shop_item_id, quantity, total_price, status, users.user_name, shop_items.name, shop_items.price
  FROM ${tableName}
  JOIN users
  ON orders.user_id=users.user_id
  JOIN shop_items
  ON shop_items.shop_items_id=orders.shop_item_id`;
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json('Something went wrong');
    return;
  }
  res.status(200).json(rows);
});

// GET uzsakyma pagal id

orderRouter.get('/:id', async (req, res) => {
  const orderId = +req.params.id;
  const sql = `SELECT * FROM ${tableName} WHERE order_id=?;`;
  const [rows, error] = await dbQueryWithData(sql, [orderId]);

  if (error) {
    res.status(500).json('Something went wrong');
    return;
  }
  res.status(200).json(rows);
});

// GET gauti visus uzsakymus priklausanciam vartotoui

orderRouter.get('/user/:user_id', async (req, res) => {
  const userId = +req.params.user_id;
  const sql = `SELECT orders.user_id, shop_item_id, quantity, total_price, status, users.user_name, shop_items.name, shop_items.price
  FROM orders
  JOIN users
  ON orders.user_id=users.user_id
  JOIN shop_items
  ON shop_items.shop_items_id=orders.shop_item_id
  WHERE orders.user_id=?`;
  const [rows, error] = await dbQueryWithData(sql, [userId]);

  if (error) {
    res.status(500).json('Something went wrong');
    return;
  }
  res.status(200).json(rows);
});

module.exports = orderRouter;
