const borrowedBookService = require("../services/borrowBook.service");
const createError = require("http-errors");

async function borrowBookByLibrarian(req, res, next) {
  try {
    const { bookId, userId, borrowedDate, paidAmount } = req.body;
    const result = await borrowedBookService.borrowBook({
      bookId,
      librarianId: req.user.id,
      userId,
      borrowedDate,
      paidAmount,
    });
    return res.status(201).json({
      isSuccess: true,
      statusCode: 201,
      message: "Successfully borrowed book",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function borrowBook(req, res, next) {
  try {
    const { bookId, librarianId, borrowedDate, paidAmount } = req.body;
    const result = await borrowedBookService.borrowBook({
      bookId,
      librarianId,
      userId: req.user.id,
      borrowedDate,
      paidAmount,
    });
    return res.status(201).json({
      isSuccess: true,
      statusCode: 201,
      message: "Successfully borrowed book",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function findRecordByLibrarian(req, res, next) {
  try {
    const { limit, offset, status } = req.query;
    const { userId } = req.params;
    if (!userId) {
      throw createError(400, "User's accountId is required");
    }
    const result = await borrowedBookService.findRecordByUser(userId, {
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
      status: status,
    });
    if (result.rows.length == 0) {
    return res.status(400).json({
      isSuccess: true,
      statusCode: 400,
      message: "No Record Found",
      data: result.rows,
      total: result.total,
    });  
    }
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Records fetched successfully",
      data: result.rows,
      total: result.total,
    });
  } catch (error) {
    next(error);
  }
}

async function findRecordByUser(req, res, next) {
  try {
    const { limit, offset, status } = req.query;
    const userId = req.user.id;
    const result = await borrowedBookService.findRecordByUser(userId, {
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
      status: status,
    });
    if (result.rows.length == 0) {
    return res.status(400).json({
      isSuccess: true,
      statusCode: 400,
      message: "No Record Found",
      data: result.rows,
      total: result.total,
    });  
    }
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Records fetched successfully",
      data: result.rows,
      total: result.total,
    });
  } catch (error) {
    next(error);
  }
}

async function returnBookByLibrarian(req, res, next) {
  try {
    const { id, userId } = req.params;
    if (!userId) {
      throw createError(400, "User's accountId is required");
    }
    await borrowedBookService.returnBook(id, userId);
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Successfully returned book",
    });
  } catch (error) {
    next(error);
  }
}

async function returnBook(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await borrowedBookService.returnBook(id, userId);
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Successfully returned book",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  borrowBookByLibrarian,
  borrowBook,
  findRecordByLibrarian,
  findRecordByUser,
  returnBookByLibrarian,
  returnBook,
};
