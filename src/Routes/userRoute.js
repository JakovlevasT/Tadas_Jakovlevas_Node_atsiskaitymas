const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkUsersBody } = require('../middleware');

const tableName = 'users';

const userRouter = express.Router();

userRouter.post('/register', checkUsersBody, async (req, res) => {
  const { user_name: userName, email, password, role_id: roleId } = req.body;
  console.log('name ===', userName);
  console.log('email ===', email);
  console.log('password ===', password);
  console.log('roleId ===', roleId);
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

module.exports = userRouter;
