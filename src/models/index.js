const { sequelize } = require("../config/database");
const { Account } = require("./account.model");
const { Book } = require("./book.model");
const { BorrowedBook } = require("./borrowedBook.model");

// Relations-->
Book.hasMany(BorrowedBook, { foreignKey: "bookId", as: "borrowRecords" });

Account.hasMany(BorrowedBook, { foreignKey: "userId", as: "borrowedBooks" });
Account.hasMany(BorrowedBook, { foreignKey: "librarianId", as: "issuedBooks" });

BorrowedBook.belongsTo(Book, { foreignKey: "bookId", as: "book" });
BorrowedBook.belongsTo(Account, { foreignKey: "userId", as: "user" });
BorrowedBook.belongsTo(Account, { foreignKey: "librarianId", as: "librarian" });

module.exports = {
  sequelize,
  Account,
  Book,
  BorrowedBook,
};
