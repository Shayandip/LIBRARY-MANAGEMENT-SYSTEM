const Joi = require("joi");
const allEnums = require("../helper/enum");

const profileUpdate = Joi.object({
  phone: Joi.string().min(0).optional(),
  name: Joi.string().min(0).optional(),
  address: Joi.string().min(0).optional(),
});

module.exports = {profileUpdate};