const Joi = require("joi");
const allEnums = require("../helper/enum");

const adminRegister = Joi.object({
  email: Joi.string().email().min(2).required(),
  password: Joi.string().min(4).required(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const register = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string()
    .valid(...Object.values(allEnums.UserRole))
    .required(),
  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required(),
  name: Joi.string().min(1).required(),
  address: Joi.string().min(1).required(),
});

const childLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string()
    .valid(...Object.values(allEnums.UserRole))
    .required(),
});

module.exports = {
  adminRegister,
  login,
  register,
  childLogin
};
