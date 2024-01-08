const Joi = require('joi');

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
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log('error ===', error);
    const msgIfError = fomratError(error);
    res.status(400).json(msgIfError);
  }
}

async function checkLoginBody(req, res, next) {
  const loginShema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).max(20).required(),
  });
  try {
    const validationResult = await loginShema.validateAsync(req.body, {
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
};
