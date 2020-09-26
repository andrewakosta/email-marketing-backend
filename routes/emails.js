const express = require("express");
const { auth } = require("../middlewares/auth");
const emailController = require("../controllers/email");
const api = express.Router();

api.post("/", auth, emailController.sendEmails);
api.get("/", auth, emailController.getSendStatistics);

module.exports = api;
