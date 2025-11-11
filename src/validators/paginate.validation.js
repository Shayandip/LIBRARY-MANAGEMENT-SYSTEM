const Joi = require("joi");
const allEnums = require("../helper/enum");

const basicPagination = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  offset: Joi.number().integer().min(0).default(0),
  keyword: Joi.string().allow("").optional(),
});

const basicStatusPagination = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  offset: Joi.number().integer().min(0).default(0),
  keyword: Joi.string().allow("").optional(),
  status: Joi.string().valid(...Object.values(allEnums.Status)).optional(),
});

module.exports = {
  basicPagination,
  basicStatusPagination,
};
