const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const allEnums = require("../helper/enum");
const { Account } = require("../models/account.model");
// const { UserDetail } = require("../models/userDetail.model");
// const { where } = require("sequelize");

async function adminRegister(data) {
  const check = await Account.findOne({
    where: { role: allEnums.UserRole.ADMIN },
  });
  if (check) {
    throw createError(400, "Admin already exists! There only be one admin!");
  }
  const hashedPass = await bcrypt.hash(String(data.password), 10);
  const newUser = new Account({
    email: data.email,
    password: hashedPass,
    role: allEnums.UserRole.ADMIN,
  });
  const admin = await newUser.save();
  return admin;
}

async function adminLogin(data) {
  const { email, password } = data;
  const admin = await Account.findOne({
    where: { email, role: allEnums.UserRole.ADMIN },
  });
  if (!admin) {
    throw createError(400, "Admin not found!");
  }
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    throw createError(401, "Invalid credential!");
  }
  const payload = { id: admin.id, email: admin.email, role: admin.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return {
    token,
    admin: { id: admin.id, email: admin.email, role: admin.role },
  };
}

async function register(data) {
  if (data.role === allEnums.UserRole.ADMIN) {
    throw createError(400, "Invalid role!");
  }
  const check = await Account.findOne({ where: { email: data.email } });
  if (check) {
    throw createError(400, "Account already exists!");
  }
  const checkPhone = await Account.findOne({ where: { phone: data.phone } });
  if (checkPhone) {
    throw createError(400, "Phone Number already exists!");
  }
  const hashedPass = await bcrypt.hash(String(data.password), 10);
  const newUser = new Account({
    email: data.email,
    password: hashedPass,
    role: data.role,
    phone: data.phone,
    name: data.name,
    address: data.address,
  });
  const admin = await newUser.save();
  return admin;
}

async function login(data) {
  const { email, password } = data;
  const account = await Account.findOne({ where: { email, role: data.role } });
  if (!account) {
    throw createError(400, "Account not found!");
  }
  const isPasswordValid = await bcrypt.compare(password, account.password);
  if (!isPasswordValid) {
    throw createError(401, "Invalid credential!");
  }
  const payload = { id: account.id, email: account.email, role: account.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return { token };
}

module.exports = { adminRegister, adminLogin, register, login };
