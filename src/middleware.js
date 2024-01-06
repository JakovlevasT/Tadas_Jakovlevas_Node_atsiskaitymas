const Joi = require('joi');

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
  }
}

module.exports = {
  checkUsersBody,
};
