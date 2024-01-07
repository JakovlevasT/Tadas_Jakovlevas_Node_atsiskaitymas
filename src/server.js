require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { testConnection } = require('./helper');
const userRouter = require('./Routes/userRoute');
const shopItemRouter = require('./Routes/shopItemsRoute');

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// use Routers

app.use('/api/auth', userRouter);
app.use('/api/shop_items', shopItemRouter);

testConnection();

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
