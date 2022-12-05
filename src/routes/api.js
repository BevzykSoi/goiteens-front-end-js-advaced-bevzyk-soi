const { Router } = require("express");

const exampleRouter = require("./example.router");
const catsRouter = require("./cats.router");

const router = Router();

router.use("/example", exampleRouter);
router.use("/cats", catsRouter);

module.exports = router;