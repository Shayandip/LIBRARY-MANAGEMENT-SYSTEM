const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const nodemailer = require("nodemailer");
const allEnums = require("../helper/enum");
const { Account } = require("../models/account.model");

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
  const randomPassword = await generatePassword(
    data.name,
    data.email,
    data.phone
  );
  sendPasswordEmail(data.email, randomPassword);

  const hashedPass = await bcrypt.hash(String(randomPassword), 10);  
  const newUser = new Account({
    email: data.email,
    password: hashedPass,
    role: data.role,
    phone: data.phone,
    name: data.name,
    address: data.address,
    status: allEnums.Status.PENDING
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
  if (account.status !== allEnums.Status.ACTIVE) {
    throw createError(400, "Account is not active! Admin approval needed");
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

function generatePassword(name, email, phone, length = 12) {
  const baseString = `${name}${email}${phone}${Date.now()}${Math.random()}`;
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~";
  let hash = 0;
  for (let i = 0; i < baseString.length; i++) {
    hash = (hash << 5) - hash + baseString.charCodeAt(i);
    hash |= 0;
  }
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.abs(
      (hash + Math.floor(Math.random() * 1000)) % chars.length
    );
    password += chars[randomIndex];
  }
  return password;
}

async function sendPasswordEmail(to, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Secure Password",
    html: `<p>Hello,</p>
           <p>Your generated secure password is: <b>${password}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Password sent to ${to}`);
}

module.exports = { adminRegister, adminLogin, register, login };
