const accountService = require("../services/account.service");

async function userList(req, res, next) {
  try {
    const { limit, offset, keyword } = req.query;
    const result = await accountService.userList({
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
      keyword: keyword || "",
    });
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Users fetched successfully",
      data: result.rows,
      total: result.total,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { userList };
