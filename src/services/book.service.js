const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const allEnums = require("../helper/enum");
const { Book } = require("../models/book.model");
const { Op, where } = require("sequelize");

async function createBook(data) {
  const findBook = await Book.findOne({ where: { bookName: data.bookName } });
  if (findBook) {
    throw createError(400, "Book already exists");
  }
  const newBook = new Book({
    bookName: data.bookName,
    desc: data.desc,
    author: data.author,
    genre: data.genre,
    quantity: data.quantity,
  });
  const book = await newBook.save();
  return book;
}

async function bookList(data) {
  const { keyword = "", limit = 10, offset = 0 } = data;
  const where = {};
  if (keyword.trim()) {
    where[Op.or] = [
      { bookName: { [Op.like]: `%${keyword}%` } },
      { desc: { [Op.like]: `%${keyword}%` } },
      { author: { [Op.like]: `%${keyword}%` } },
      { genre: { [Op.like]: `%${keyword}%` } },
      { quantity: { [Op.like]: `%${keyword}%` } },
    ];
  }

  const { rows, count: total } = await Book.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return { rows, total };
}

async function updateBook(id, data) {
  const findBook = await Book.findOne({ where: { id } });
  if (!findBook) {
    throw createError(400, "Book not found!");
  }

  const updatedFields = {};
  if (data.bookName) updatedFields.bookName = data.bookName;
  if (data.desc) updatedFields.desc = data.desc;
  if (data.author) updatedFields.author = data.author;
  if (data.genre) updatedFields.genre = data.genre;
  if (data.quantity) updatedFields.quantity = data.quantity;

  if (Object.keys(updatedFields).length === 0) {
    throw createError(400, "No valid fields provided for update!");
  }
  await findBook.update(updatedFields);

  return findBook;
}

async function deleteBook(id) {
  const findBook = await Book.findOne({ where: { id } });
  if (!findBook) {
    throw createError(400, "Book not found!");
  }
  await findBook.destroy();
  return findBook;
}

module.exports = { createBook, updateBook, bookList, deleteBook };
