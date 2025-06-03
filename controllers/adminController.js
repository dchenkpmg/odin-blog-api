const bcrypt = require("bcryptjs");
const db = require("../db/db");
const { validationResult } = require("express-validator");
const utils = require("../config/utils");

async function adminRegister(req, res, next) {
  console.log("Admin registration request received:", req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.createUser(
      req.body.username,
      hashedPassword,
      req.body.adminCode === process.env.ADMIN_CODE ? true : false,
    );
    return res.status(200).json({ message: "Admin registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function adminLogin(req, res, next) {
  console.log(`Logging in user ${req.body.username}...`);
  try {
    const existingUser = await db.getUserByUsername(req.body.username);
    if (!existingUser) {
      return res.status(400).json({ message: "Username or Password is wrong" });
    }
    const match = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );
    if (!match) {
      return res.status(400).json({ message: "Username or password is wrong" });
    }
    const tokenObject = utils.issueJWT(existingUser);
    res.status(200).json({
      userId: existingUser.id,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  adminRegister,
  adminLogin,
};
