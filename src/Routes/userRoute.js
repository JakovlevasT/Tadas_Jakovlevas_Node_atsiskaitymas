const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkUsersBody, checkLoginBody } = require('../middleware');

const tableName = 'users';

const userRouter = express.Router();

userRouter.post('/register', checkUsersBody, async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { user_name: userName, email, password, role_id: roleId } = req.body;
  const argArr = [userName, email, password, roleId];
  const sql = `INSERT INTO ${tableName} ( user_name, email, password, role_id) VALUES (?,?,?,?) `;

  const [insertResultObj, error] = await dbQueryWithData(sql, argArr);

  if (error) {
    res.status(500).json('Server error');
    return;
  }
  if (insertResultObj.affectedRows === 1) {
    res.status(201).json({ status: 'success', user: insertResultObj });
    return;
  }
  res.status(400).json('no rows affected');
});

userRouter.post('/login', checkLoginBody, async (req, res) => {
  const { email, password } = req.body;
  const argArr = [email, password];
  const sql = `SELECT * FROM ${tableName} WHERE email=? AND password=?`;
  const [rows, error] = await dbQueryWithData(sql, argArr);
  if (error) {
    res.status(400).json({ status: 'error', errors: error });
    return;
  }
  if (rows.length === 0) {
    res
      .status(400)
      .json({ errorMsg: 'User or password does not exist', status: 'Error' });
    return;
  }
  console.log(rows, error);
  res.json({ user: rows[0], status: 'Success' });
});

userRouter.get('/users', async (req, res) => {
  const sql = `SELECT * FROM ${tableName}`;
  const [rows, error] = await dbQueryWithData(sql);

  res.json(rows);
});

module.exports = userRouter;
