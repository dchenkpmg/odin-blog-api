const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const db = require("../db/db");
const { validationResult } = require("express-validator");
const utils = require("../config/utils");

const prisma = new PrismaClient();

async function adminRegister(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const existingUser = await prisma.users.findUnique({
      where: { username: req.body.username },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.createUser(
      req.body.username,
      hashedPassword,
      req.body.adminCode === process.env.ADMIN_CODE ? true : false,
    );
    if (req.body.adminCode === process.env.ADMIN_CODE) {
      return res.status(200).json({ message: "Admin registered successfully" });
    } else {
      return res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    next(error);
  }
}

async function adminLogin(req, res, next) {
  try {
    const existingUser = await prisma.users.findUnique({
      where: { username: req.body.username },
    });
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
      success: true,
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
