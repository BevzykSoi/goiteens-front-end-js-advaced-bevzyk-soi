const express = require("express");

const { auth, isVerified } = require("../middlewares");

const router = express.Router();

router.post("/", auth, isVerified, (req, res) => res.status(201).send("Post created!"));

module.exports = router;
