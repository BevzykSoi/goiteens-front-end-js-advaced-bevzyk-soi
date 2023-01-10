const express = require('express');

const authRouter = require("./auth.router");
const postsRouter = require("./posts.router");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", postsRouter);

module.exports = router;
