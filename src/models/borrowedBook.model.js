const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");
const allEnums = require("../helper/enum");

exports.BorrowedBook = sequelize.define(
  "borrowedBook",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    bookId: {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "books",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "accounts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    librarianId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "accounts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    borrowedDate: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    returnDate: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM("BORROWED", "RETURNED"),
      defaultValue: allEnums.BookBorrowStatus.BORROWED,
    },
    paidAmount: {
      allowNull: true,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);


