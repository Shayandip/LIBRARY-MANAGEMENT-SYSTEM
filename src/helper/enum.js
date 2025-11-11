const UserRole = {
  ADMIN: "ADMIN",
  LIBRARIAN: "LIBRARIAN",
  USER: "USER",
};

const Status = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  DEACTIVE: "DEACTIVE",
};

const BookBorrowStatus = {
  BORROWED: "BORROWED",
  RETURNED: "RETURNED",
};

module.exports = { UserRole, Status, BookBorrowStatus };
