const Joi = require("joi");

const createBorrowBookByUser = Joi.object({
  bookId: Joi.string().uuid().required(),
  librarianId: Joi.string().uuid().required(),
  borrowedDate: Joi.date().iso().required(),
  paidAmount: Joi.number().integer().min(0).required(),
});

const createBorrowBookByLibrarian = Joi.object({
  bookId: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  borrowedDate: Joi.date().iso().required(),
  paidAmount: Joi.number().integer().min(0).required(),
});

module.exports = { createBorrowBookByUser, createBorrowBookByLibrarian };
