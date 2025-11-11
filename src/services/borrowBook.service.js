const createError = require("http-errors");
const allEnums = require("../helper/enum");
const { Book } = require("../models/book.model");
const { BorrowedBook } = require("../models/borrowedBook.model");
const { Account } = require("../models/account.model");
const { Op, where } = require("sequelize");

async function borrowBook(data) {
  const findBook = await Book.findOne({ where: { id: data.bookId } });
  if (!findBook) {
    throw createError(400, "Book not found!");
  }
  if (findBook.quantity == 0 || findBook.quantity < 0) {
    throw createError(400, "Book is not available!");
  }
  const findUser = await Account.findOne({ where: { id: data.userId } });
  if (!findUser) {
    throw createError(400, "User not found!");
  }
  const findLibrarian = await Account.findOne({
    where: { id: data.librarianId },
  });
  if (!findLibrarian) {
    throw createError(400, "Librarian not found!");
  }
  const findBorrowedBook = await BorrowedBook.findOne({
    where: {
      bookId: data.bookId,
      userId: data.userId,
      status: allEnums.BookBorrowStatus.BORROWED,
    },
  });
  if (findBorrowedBook) {
    throw createError(400, "Book already borrowed! Please return first!");
  }
  const newBorrowedBook = new BorrowedBook({
    bookId: data.bookId,
    librarianId: data.librarianId,
    userId: data.userId,
    borrowedDate: data.borrowedDate,
    paidAmount: data.paidAmount,
    status: allEnums.BookBorrowStatus.BORROWED,
  });
  const borrowBook = await newBorrowedBook.save();
  await Book.update(
    { quantity: findBook.quantity - 1 },
    { where: { id: data.bookId } }
  );
  return borrowBook;
}

async function findRecordByUser(userId, data) {
  const { limit = 10, offset = 0, status } = data;
  const where = { userId: userId };
  if (status) {
    where.status = status;
  }
  const { rows, count: total } = await BorrowedBook.findAndCountAll({
    where,
    attributes: [
      "id",
      "borrowedDate",
      "returnDate",
      "paidAmount",
      "status",
      "createdAt",
    ],
    include: [
    { model: Book, as: "book", attributes: ["id", "bookName", "desc","author", "genre"], },
    { model: Account, as: "librarian", attributes: ["id", "name", "email", "phone"], },
  ],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return { rows, total };
}

async function returnBook(id, userId) {
  const findBorrowedBook = await BorrowedBook.findOne({
    where: {
      id: id,
      userId: userId,
      status: allEnums.BookBorrowStatus.BORROWED,
    },
  });
  if (!findBorrowedBook) {
    throw createError(400, "Borrowed book not found!");
  }
  const findBook = await Book.findOne({
    where: { id: findBorrowedBook.bookId },
  });
  if (!findBook) {
    throw createError(400, "Book not found!");
  }
  await BorrowedBook.update(
    { status: allEnums.BookBorrowStatus.RETURNED, returnDate: new Date() },
    { where: { id: id } }
  );
  await Book.update(
    { quantity: findBook.quantity + 1 },
    { where: { id: findBorrowedBook.bookId } }
  );
  return true;
}

module.exports = { borrowBook, findRecordByUser, returnBook };
