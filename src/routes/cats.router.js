const { Router } = require("express");

const catsController = require("../controllers/cats.controller");

const router = Router();

router.post("/", catsController.create);
router.get("/", catsController.getAll);
router.get("/:catId", catsController.findById);
router.delete("/:catId", catsController.delete);

module.exports = router;