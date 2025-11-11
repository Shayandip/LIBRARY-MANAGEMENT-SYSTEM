const bookService = require("../services/book.service");

async function createBook(req, res, next) {
  try {
    const { bookName, desc, author, genre, quantity } = req.body;
    const account = await bookService.createBook({
      bookName,
      desc,
      author,
      genre,
      quantity,
    });
    return res.status(201).json({
      isSuccess: true,
      statusCode: 201,
      message: "Book created Successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
}

async function bookList(req, res, next) {
  try {
    const { limit, offset, keyword } = req.query;
    const result = await bookService.bookList({
      limit: Number(limit) || 10,
      offset: Number(offset) || 0,
      keyword: keyword || "",
    });
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Books fetched successfully",
      data: result.rows,
      total: result.total,
    });
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        isSuccess: true,
        statusCode: 400,
        message: "Book Id is required!",
      });
    }
    if (!req.body) {
      return res.status(200).json({
        isSuccess: true,
        statusCode: 200,
        message: "Nothing updated",
      });
    }
    const { bookName, desc, author, genre, quantity } = req.body;
    const result = await bookService.updateBook(id, {
      bookName,
      desc,
      author,
      genre,
      quantity,
    });
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        isSuccess: true,
        statusCode: 400,
        message: "Book Id is required!",
      });
    }
    const result = await bookService.deleteBook(id);
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Book removed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBook,
  bookList,
  updateBook,
  deleteBook
};
