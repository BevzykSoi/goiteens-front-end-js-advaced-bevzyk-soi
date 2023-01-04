const express = require("express");

const {
  register,
  verify,
  resendVerification,
  sendTestEmail,
  deleteUser
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/verify/:verificationToken", verify);
router.post("/resend-verification", resendVerification);
router.post("/send-test", sendTestEmail);
router.delete("/:email", deleteUser);

module.exports = router;
