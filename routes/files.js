const express = require("express");
const filesController = require("../controllers/files.js");
const multipart = require("connect-multiparty");
const { auth } = require("../middlewares/auth");
const { check } = require("express-validator");
const md_uploadfile = multipart({ uploadDir: "./uploads/xlsx" });

const api = express.Router();

api.post("/:id", auth, md_uploadfile, filesController.uploadFile);

api.delete(
  "/:id",

  [check("fileName", "The name file is madatory").not().isEmpty()],

  auth,
  filesController.deleteFile
);

api.get("/:id", auth, filesController.getFiles);

module.exports = api;
