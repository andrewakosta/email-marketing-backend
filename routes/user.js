const express = require("express");
const userController = require("../controllers/user");
const { check } = require("express-validator");

const api = express.Router();

api.post(
  "/sign-up",
  [
    check("name", "The name is mandatory").not().isEmpty(),
    check("email", "Please send a E-mial valid").isEmail(),
    check(
      "password",
      "The password must be have more than 6 characters"
    ).isLength({ min: 6 }),
  ],
  userController.signUp
);

module.exports = api;
