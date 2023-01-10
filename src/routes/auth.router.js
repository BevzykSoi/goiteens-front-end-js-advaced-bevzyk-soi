const express = require("express");

const {
  register,
  verify,
  resendVerification,
  deleteUser,
} = require("../controllers/auth.controller");
const { auth } = require("../middlewares");

const router = express.Router();

router.post("/register", register);
router.post("/verify/:verificationToken", auth, verify);
router.post("/resend-verification", auth, resendVerification);
router.delete("/:email", auth, deleteUser);

module.exports = router;
