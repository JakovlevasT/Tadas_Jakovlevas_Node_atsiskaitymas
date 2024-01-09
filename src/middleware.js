const Joi = require('joi');
const { dbQueryWithData } = require('./helper');

function fomratError(errObj) {
  const errMsg = errObj.details.map((el) => {
    const errKey = el.path[0];
    const errorMsg = el.message;
    return { field: errKey, error: errorMsg };
  });
  return errMsg;
}

async function checkUsersBody(req, res, next) {
  const userShema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).required(),
    role_id: Joi.number().positive().required(),
  });

  try {
    const validationResult = await userShema.validateAsync(req.body, {
      abortEarly: false,
    });
    const sql = `SELECT * FROM users WHERE email = "${validationResult.email}"`;
    const [rows, error] = await dbQueryWithData(sql);
    console.log('    validationResult.email ===', validationResult.email);
    console.log('rows ===', rows);

    if (error) {
      res.status(500).json(error);
    } else if (rows.length !== 0) {
      res.status(400).json({
        errors: [{ field: 'email', error: 'Email exists' }],
        status: 'error',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log('error ===', error);
    const msgIfError = fomratError(error);
    res.status(400).json({ errors: msgIfError, status: 'error' });
  }
}

async function checkLoginBody(req, res, next) {
  const loginShema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });
  try {
    const validationResult = await loginShema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    const msgIfError = fomratError(error);
    res.status(400).json({ errors: msgIfError, status: 'error' });
  }
}

async function checkShopItemsBody(req, res, next) {
  const shopItemShema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    price: Joi.number().integer().required(),
    description: Joi.string().min(3).required(),
    image: Joi.string().min(3).required(),
    item_type_id: Joi.number().positive().required(),
  });
  try {
    const validationResult = await shopItemShema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    const msgIfError = fomratError(error);
    res.status(400).json({ errors: msgIfError, status: 'error' });
  }
}

async function checkOrdersBody(req, res, next) {
  const orderShema = Joi.object({
    user_id: Joi.number().positive().required(),
    shop_item_id: Joi.number().positive().required(),
    quantity: Joi.number().required(),
    total_price: Joi.number().required(),
    status: Joi.string().min(2).required(),
  });
  try {
    const validationResult = await orderShema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    const msgIfError = fomratError(error);
    res.status(400).json(msgIfError);
  }
}
module.exports = {
  checkUsersBody,
  checkLoginBody,
  checkShopItemsBody,
  checkOrdersBody,
};
