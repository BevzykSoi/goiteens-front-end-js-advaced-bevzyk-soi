const express = require("express");
require("dotenv").config();
const cors = require("cors");

const apiRouter = require("./routes/api");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", apiRouter);

app.use(errorHandler);

module.exports = app;
