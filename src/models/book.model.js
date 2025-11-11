const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

exports.Book = sequelize.define(
  "book",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    bookName: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    desc: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    author: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    genre: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    quantity: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);
