const express = require("express");
const http = require("http");
const socketio = require("socket.io");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database succesfully connected!");
}).catch((err) => {
    console.log(err);
    process.exit(1);
})

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer, {
    cors: {
        origin: "*",
    }
});

app.get('/', (req, res) => {
    res.send("Hello, world!");
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server started! Location: http://localhost:${process.env.PORT}`);
});