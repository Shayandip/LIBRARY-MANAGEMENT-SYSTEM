const Joi = require("joi");

const createBook = Joi.object({
  bookName: Joi.string().min(2).required(),
  desc: Joi.string().min(4).required(),
  author: Joi.string().min(1).required(),
  genre: Joi.string().min(2).required(),
  quantity: Joi.number().integer().min(0).required(),
});

const updateBook = Joi.object({
  bookName: Joi.string().min(0).optional(),
  desc: Joi.string().min(0).optional(),
  author: Joi.string().min(0).optional(),
  genre: Joi.string().min(0).optional(),
  quantity: Joi.number().integer().min(0).optional(),
});

module.exports = {
  createBook,updateBook
};
