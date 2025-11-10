const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");
const bcrypt = require("bcryptjs");

exports.Account = sequelize.define(
  "account",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    role: {
      allowNull: false,
      type: Sequelize.ENUM("ADMIN", "LIBRARIAN", "USER"),
      defaultValue: "USER",
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM("PENDING", "ACTIVE", "DEACTIVE"),
      defaultValue: "ACTIVE",
    },
    phone: {
      allowNull: true,
      type: Sequelize.STRING,
      validate: {
        isNumeric: true,
        len: [10, 15],
      },
    },
    name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    address: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    // hooks: {
    //   beforeCreate: async (account) => {
    //     const salt = await bcrypt.genSalt(10);
    //     account.password = await bcrypt.hash(account.password, salt);
    //   },
    //   beforeUpdate: async (account) => {
    //     if (account.changed("password")) {
    //       const salt = await bcrypt.genSalt(10);
    //       account.password = await bcrypt.hash(account.password, salt);
    //     }
    //   },
    // },
    timestamps: true,
  }
);
