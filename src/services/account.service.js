const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const allEnums = require("../helper/enum");
const { Account } = require("../models/account.model");
const { UserDetail } = require("../models/userDetail.model");
const { Op } = require("sequelize");

async function userList(data) {
  const whereCondition = {};
  if (data.keyword) {
    whereCondition[Op.or] = [
      { email: { [Op.like]: `%${data.keyword}%` } },
      { phone: { [Op.like]: `%${data.keyword}%` } },
      { "$userDetail.name$": { [Op.like]: `%${data.keyword}%` } },
    ];
  }

  const { rows, count: total } = await Account.findAndCountAll({
    where: whereCondition,
    include: [
      {
        model: UserDetail,
        required: true, // like INNER JOIN, use false for LEFT JOIN
      },
    ],
    limit: data.limit,
    offset: data.offset,
    order: [["createdAt", "DESC"]],
  });

  return { rows, total };
}

module.exports = { userList };
