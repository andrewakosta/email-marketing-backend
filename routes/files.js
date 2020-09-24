const express = require("express");
//const filesController = require('../controllers/files.js')
//const {check} = require('express-validator')
const { auth } = require("../middlewares/auth");

const api = express.Router();

api.post("/upload-files", auth, (req, res) => {
  return res.status(200).json({ user: req.body.user });
});

module.exports = api;
