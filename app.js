const express = require("express");

const app = express();
const { API_VERSION } = require("./config");

app.get(`/api/${API_VERSION}`, (req, res) => {
  res.send("Testing server");
});

module.exports = app;
