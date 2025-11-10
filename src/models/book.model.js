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
  },
  {
    timestamps: true,
  }
);