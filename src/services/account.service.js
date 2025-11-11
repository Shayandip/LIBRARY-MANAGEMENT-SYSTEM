const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const allEnums = require("../helper/enum");
const { Account } = require("../models/account.model");
const { Op, where } = require("sequelize");

async function userList(data) {
  const { keyword = "", limit = 10, offset = 0, status } = data;
  const where = { role: allEnums.UserRole.USER };
  if (status) {
    where.status = status;
  }
  if (keyword.trim()) {
    where[Op.or] = [
      { name: { [Op.like]: `%${keyword}%` } },
      { email: { [Op.like]: `%${keyword}%` } },
      { phone: { [Op.like]: `%${keyword}%` } },
    ];
  }

  const { rows, count: total } = await Account.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return { rows, total };
}

async function librarianList(data) {
  const { keyword = "", limit = 10, offset = 0, status } = data;
  const where = { role: allEnums.UserRole.LIBRARIAN };
  if (status) {
    where.status = status;
  }
  if (keyword.trim()) {
    where[Op.or] = [
      { name: { [Op.like]: `%${keyword}%` } },
      { email: { [Op.like]: `%${keyword}%` } },
      { phone: { [Op.like]: `%${keyword}%` } },
    ];
  }

  const { rows, count: total } = await Account.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return { rows, total };
}

async function librarianListByUser(data) {
  const { keyword = "", limit = 10, offset = 0 } = data;
  const where = {
    role: allEnums.UserRole.LIBRARIAN,
    status: allEnums.Status.ACTIVE,
  };
  if (keyword.trim()) {
    where[Op.or] = [
      { name: { [Op.like]: `%${keyword}%` } },
      { email: { [Op.like]: `%${keyword}%` } },
      { phone: { [Op.like]: `%${keyword}%` } },
    ];
  }

  const { rows, count: total } = await Account.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return { rows, total };
}

async function getProfile(id) {
  const findAcc = await Account.findOne({ where: { id } });
  if (!findAcc) {
    throw createError(400, "Account not found!");
  }
  return findAcc;
}

async function profileUpdate(id, data) {
  const findAcc = await Account.findOne({ where: { id } });
  if (!findAcc) {
    throw createError(400, "Account not found!");
  }

  const updatedFields = {};
  if (data.name) updatedFields.name = data.name;
  if (data.phone) updatedFields.phone = data.phone;
  if (data.address) updatedFields.address = data.address;

  if (Object.keys(updatedFields).length === 0) {
    throw createError(400, "No valid fields provided for update!");
  }
  await findAcc.update(updatedFields);

  return findAcc;
}

async function giveApproval(id) {
  const findAcc = await Account.findOne({ where: { id } });
  if (!findAcc) {
    throw createError(400, "Account not found!");
  }
  const updatedFields = { status: allEnums.Status.ACTIVE };
  await findAcc.update(updatedFields);
  return findAcc;
}

async function deleteAccount(id) {
  const findAcc = await Account.findOne({ where: { id } });
  if (!findAcc) {
    throw createError(400, "Account not found!");
  }
  await findAcc.destroy();
  return findAcc;
}

module.exports = {
  userList,
  librarianList,
  librarianListByUser,
  getProfile,
  profileUpdate,
  giveApproval,
  deleteAccount,
};
