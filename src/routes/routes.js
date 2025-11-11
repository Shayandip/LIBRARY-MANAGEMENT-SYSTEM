const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize");
const allEnums = require("../helper/enum");
const validate = require("../middlewares/validate");
const authValidation = require("../validators/auth.validation");
const bookValidation = require("../validators/book.validation");
const paginationValidation = require("../validators/paginate.validation");
const accountValidation = require("../validators/account.validation");
const borrowBookValidation = require("../validators/borrowBook.validation");
const authController = require("../controllers/auth.controller");
const bookController = require("../controllers/book.controller");
const accountController = require("../controllers/account.controller");
const borrowBookController = require("../controllers/borrowBook.controller");

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
  authorize(allEnums.UserRole.ADMIN, allEnums.UserRole.LIBRARIAN),
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
router.get(
  "/user/librarian-list",
  authenticateToken,
  authorize(allEnums.UserRole.USER),
  validate(paginationValidation.basicPagination),
  accountController.librarianListByUser
);
router.get(
  "/profile",
  authenticateToken,
  authorize(allEnums.UserRole.LIBRARIAN, allEnums.UserRole.USER),
  accountController.getProfile
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
router.get(
  "/book-list",
  authenticateToken,
  authorize(
    allEnums.UserRole.ADMIN,
    allEnums.UserRole.LIBRARIAN,
    allEnums.UserRole.USER
  ),
  validate(paginationValidation.basicPagination),
  bookController.bookList
);
router.patch(
  "/update-book/:id",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  validate(bookValidation.updateBook),
  bookController.updateBook
);
router.delete(
  "/remove-book/:id",
  authenticateToken,
  authorize(allEnums.UserRole.ADMIN),
  bookController.deleteBook
);

//Borrowed Book Routes-->
router.post(
  "/borrow-book-libraian",
  authenticateToken,
  authorize(allEnums.UserRole.LIBRARIAN),
  validate(borrowBookValidation.createBorrowBookByLibrarian),
  borrowBookController.borrowBookByLibrarian
);
router.post(
  "/borrow-book",
  authenticateToken,
  authorize(allEnums.UserRole.USER),
  validate(borrowBookValidation.createBorrowBookByUser),
  borrowBookController.borrowBook
);
router.get(
  "/borrow-record-librarian/:userId",
  authenticateToken,
  authorize(allEnums.UserRole.LIBRARIAN, allEnums.UserRole.ADMIN),
  validate(paginationValidation.basicPagination),
  borrowBookController.findRecordByLibrarian
);
router.get(
  "/borrow-record",
  authenticateToken,
  authorize(allEnums.UserRole.USER),
  validate(paginationValidation.basicPagination),
  borrowBookController.findRecordByUser
);
router.patch(
  "/return-book-librarian/:id/:userId",
  authenticateToken,
  authorize(allEnums.UserRole.LIBRARIAN),
  borrowBookController.returnBookByLibrarian
);
router.patch(
  "/return-book/:id",
  authenticateToken,
  authorize(allEnums.UserRole.USER),
  borrowBookController.returnBook
);

module.exports = router;
