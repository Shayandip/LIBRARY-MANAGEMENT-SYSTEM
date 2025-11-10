const Joi = require("joi");

const createBook = Joi.object({
  bookName: Joi.string().min(2).required(),
  desc: Joi.string().min(4).required(),
});

module.exports = {
  createBook,
};