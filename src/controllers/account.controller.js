const accountService = require("../services/account.service");
const authService = require("../services/auth.service");

async function createUser(req, res, next) {
  try {
    const { email, role, name, phone, address } = req.body;
    const account = await authService.register({
      email,
      role,
      name,
      phone,
      address,
    });
    return res.status(201).json({
      isSuccess: true,
      statusCode: 201,
      message: "Registration Successful",
      data: account,
    });
  } catch (error) {
    next(error);
  }
}

async function userList(req, res, next) {
  try {
    const { limit, offset, keyword, status } = req.query;
    const result = await accountService.userList({
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
      keyword: keyword || "",
      status: status,
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

async function librarianList(req, res, next) {
  try {
    const { limit, offset, keyword, status } = req.query;
    const result = await accountService.librarianList({
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
      keyword: keyword || "",
      status: status,
    });
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Librarians fetched successfully",
      data: result.rows,
      total: result.total,
    });
  } catch (error) {
    next(error);
  }
}

async function librarianListByUser(req, res, next) {
  try {
    const { limit, offset, keyword } = req.query;
    const result = await accountService.librarianListByUser({
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
      keyword: keyword || "",
    });
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Librarians fetched successfully",
      data: result.rows,
      total: result.total,
    });
  } catch (error) {
    next(error);
  }
}

async function getProfile(req, res, next) {
   try {
    const id = req.user.id;
    const result = await accountService.getProfile(id);
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Profile fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function profileUpdate(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        isSuccess: true,
        statusCode: 400,
        message: "Account Id is required!",
      });
    }
    if (!req.body) {
      return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Nothing updated",
    });
    }
    const { name, phone, address } = req.body;
    const account = await accountService.profileUpdate(id, {
      name,
      phone,
      address,
    });
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Account updated successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
}

async function giveApproval(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        isSuccess: true,
        statusCode: 400,
        message: "Account Id is required!",
      });
    }
    const account = await accountService.giveApproval(id);
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Account approved successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteAccount(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        isSuccess: true,
        statusCode: 400,
        message: "Account Id is required!",
      });
    }
    const account = await accountService.deleteAccount(id);
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Account removed successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createUser, userList, librarianList,librarianListByUser, getProfile, profileUpdate, giveApproval, deleteAccount };
