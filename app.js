const express = require("express");
const cors = require("cors");

const { API_VERSION } = require("./config");
const userRoutes = require("./routes/user");
const fileRoutes = require("./routes/files");
const emailsRoutes = require("./routes/emails");
const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

//Routes
app.use(`/api/${API_VERSION}/user`, userRoutes);
app.use(`/api/${API_VERSION}/files`, fileRoutes);
app.use(`/api/${API_VERSION}/emails`, emailsRoutes);

module.exports = app;
