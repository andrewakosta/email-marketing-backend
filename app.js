const express = require("express");
const cors = require("cors");

const { API_VERSION } = require("./config");
const userRoutes = require("./routes/user");
const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

//Routes
app.use(`/api/${API_VERSION}/user`, userRoutes);

module.exports = app;
