const { body } = require("express-validator");
const db = require("../db/db");

const signUpValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 1, max: 20 })
    .withMessage(
      "Username must be at least 3 characters long and at most 20 characters long",
    )
    .custom(async (username) => {
      const existingUser = await db.getUserByUsername(username);
      if (existingUser) {
        throw new Error("User already exists");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage(
      "Password must be at least 6 characters long and at most 20 characters long",
    ),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
  body("adminCode")
    .trim()
    .custom((value) => {
      if (value !== process.env.ADMIN_CODE) {
        throw new Error("Invalid admin code");
      }
      return true;
    }),
];

module.exports = { signUpValidation };
