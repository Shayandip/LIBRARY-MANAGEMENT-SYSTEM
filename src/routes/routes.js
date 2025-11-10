const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");
const allEnums = require("../helper/enum");
const validate = require("../middlewares/validate");
const authValidation = require("../validators/auth.validation");
const bookValidation = require("../validators/book.validation");
const paginationValidation = require("../validators/paginate.validation");
const authController = require("../controllers/auth.controller");
const bookController = require("../controllers/book.controller");

//Auth Routes-->
router.post(
  "/admin-register",
  validate(authValidation.adminRegister),
  authController.adminRegister
);
router.post(
  "/admin-login",
  validate(authValidation.login),
  authController.adminLogin
);
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post(
  "/login",
  validate(authValidation.childLogin),
  authController.login
);

//Account Routes-->
router.get(
  "/admin/user-list",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  validate(paginationValidation.basicPagination)
);

//Book Routes-->
router.post(
  "/create-book",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  validate(bookValidation.createBook),
  bookController.createBook
);

module.exports = router;
