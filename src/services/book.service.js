const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const allEnums = require("../helper/enum");
const { Book } = require("../models/book.model");

async function createBook(data) {
  const findBook = await Book.findOne({ where: { bookName: data.bookName } });
  if (findBook) {
    throw createError(400, "Book already exists");
  }
  const newBook = new Book({
    bookName: data.bookName,
    author: data.author,
    genre: data.genre,
    quantity: data.quantity,
  });
}

module.exports = { createBook };
