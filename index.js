const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello, World!"));

const templateMongoUrl = "mongodb://<username>:<password>@<service-name>:27017";
const exampleMongoUrl = "mongodb://root:root@database:27017";

app.listen(5000, () => {
  console.log("Server started");
});