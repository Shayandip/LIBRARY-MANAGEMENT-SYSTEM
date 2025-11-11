const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");
const allEnums = require("../helper/enum");
const validate = require("../middlewares/validate");
const authValidation = require("../validators/auth.validation");
const bookValidation = require("../validators/book.validation");
const paginationValidation = require("../validators/paginate.validation");
const accountValidation = require('../validators/account.validation');
const authController = require("../controllers/auth.controller");
const bookController = require("../controllers/book.controller");
const accountController = require("../controllers/account.controller");

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
router.post(
  "/create-user",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  validate(authValidation.register),
  accountController.createUser
);
router.get(
  "/admin/user-list",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  validate(paginationValidation.basicStatusPagination),
  accountController.userList
);
router.get(
  "/admin/librarian-list",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  validate(paginationValidation.basicStatusPagination),
  accountController.librarianList
);
router.patch(
  "/update/:id",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  validate(accountValidation.profileUpdate),
  accountController.profileUpdate
);
router.patch(
  "/approve/:id",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  accountController.giveApproval
);
router.delete(
  "/remove/:id",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  accountController.deleteAccount
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
