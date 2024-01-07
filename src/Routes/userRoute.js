const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkUsersBody } = require('../middleware');

const tableName = 'users';

const userRouter = express.Router();

userRouter.post('/register', checkUsersBody, async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { user_name: userName, email, password, role_id: roleId } = req.body;
  const argArr = [userName, email, password, roleId];
  const sql = `INSERT INTO ${tableName} ( user_name, email, password, role_id) VALUES (?,?,?,?) `;

  const [insertResultObj, error] = await dbQueryWithData(sql, argArr);
  console.log('error ===', error);
  console.log('argArr ===', argArr);
  console.log('insertResultObj ===', insertResultObj);

  if (error) {
    res.status(500).json('Server error');
    return;
  }
  if (insertResultObj.affectedRows === 1) {
    res.status(201).json('Successfuly registered user');
    return;
  }
  res.status(400).json('no rows affected');
});

userRouter.post('/login', async (req, res) => {
  const { user_name: userName, password } = req.body;
  const argArr = [userName, password];
  const sql = `SELECT * FROM ${tableName} WHERE user_name=? AND password=?`;
  const [rows, error] = await dbQueryWithData(sql, argArr);
  if (rows.length === 0) {
    res.status(400).json('duomenys nesutampa');
  }

  console.log(rows, error);
  res.json(rows[0]);
});
module.exports = userRouter;
