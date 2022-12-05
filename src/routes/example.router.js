const { Router } = require("express");

const exampleController = require("../controllers/example.controller");

const router = Router();

router.get("/hello", exampleController.sayHello);

module.exports = router;