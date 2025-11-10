const authService = require("../services/auth.service");

async function adminRegister(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await authService.adminRegister({ email, password });
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Registration Successful",
      data: admin,
    });
  } catch (error) {
    next(error);
  }
}

async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.adminLogin({ email, password });
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Login Successful",
      data: user,
      token,
    });
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const { email, password, role, name, phone, address } = req.body;
    const librarian = await authService.register({
      email,
      password,
      role,
      name,
      phone,
      address,
    });
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Registration Successful",
      data: librarian,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password, role } = req.body;
    const { token } = await authService.login({ email, password, role });    
    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "Login Successful",
      role: role,
      token,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { adminRegister, adminLogin, register, login };
