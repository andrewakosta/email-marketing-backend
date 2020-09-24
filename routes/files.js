const express = require("express");
const filesController = require("../controllers/files.js");
const multipart = require("connect-multiparty");
const { auth } = require("../middlewares/auth");
const md_uploadfile = multipart({ uploadDir: "./uploads/xlsx" });

const api = express.Router();

api.post("/:id", auth, md_uploadfile, filesController.uploadFile);

module.exports = api;
