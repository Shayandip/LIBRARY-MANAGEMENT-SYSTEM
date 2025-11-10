require("dotenv").config();
const Sequelize = require("sequelize");

exports.sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
    port: process.env.MYSQL_PORT,
    logging: false,
    // logging: (query) => console.log(query)
  }
);
