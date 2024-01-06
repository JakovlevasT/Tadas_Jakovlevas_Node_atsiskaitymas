const express = require('express');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  const { name, email, password, role_id: roleId } = req.body;
  const sql = 
});

module.exports = userRouter;
