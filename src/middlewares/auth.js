const User = require("../api/models/userMdl");
const { verifySign } = require("../utils/jwt");

const checkAuth = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const tokenVerified = verifySign(token);
    if (!tokenVerified.id) {
      return res.status(401).json(tokenVerified);
    }
    const userLogged = await User.findById(tokenVerified.id);
    req.user = userLogged;
  } catch (error) {
    return res.status(500).json(error);
  }
};

const isAuth = async (req, res, next) => {
  try {
    await checkAuth(req, res);
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};


const isAdmin = async (req, res, next) => {
  try {
    await checkAuth(req, res);
    const userLogged = req.user;
    if (userLogged.role !== "ROLE_ADMIN") {
      return res.status(401).json({ message: "You have to be admin" });
    }
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { isAuth, isAdmin };
