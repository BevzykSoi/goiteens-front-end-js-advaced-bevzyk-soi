const Chance = require("chance");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const transport = require("../config/emailTransport");

const chance = new Chance();

exports.sendTestEmail = async (req, res, next) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const fakeTransport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const emailInfo = await fakeTransport.sendMail({
      from: `"Test account" <${testAccount.user}>`,
      to: "test@example.com",
      subject: "Testing email service",
      text: "Hello, test user! Here is your verification code: 123456",
      html: "<p>Hello, test user! Here is your verification code:</p><h1>123456</h1>",
    });

    const emailUrl = nodemailer.getTestMessageUrl(emailInfo);

    res.status(200).json({ emailInfo, emailUrl });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      res.status(400).send("Email already in use!");
      return;
    }

    const verificationToken = chance
      .integer({ min: 100000, max: 999999 })
      .toString();

    const emailInfo = await transport.sendMail({
      from: `"Verify email with token" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Email verification token",
      text: `Here is your verification token: ${verificationToken}`,
      html: `<p style="font-family: sans-serif; font-weight: 700; color: palevioletred">Here is your verification token:</p><h1>${verificationToken}</h1>`,
    });

    const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);

    const user = await User.create({
      email,
      verificationToken: hashedVerificationToken,
    });

    res.status(201).json({ user, emailInfo });
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send("User not found!");
      return;
    }

    const isTokenValid = await bcrypt.compare(
      verificationToken,
      user.verificationToken
    );

    if (!isTokenValid) {
      res.status(401).send("Invalid verification token!");
      return;
    }

    user.verificationToken = null;
    user.isVerified = true;

    await user.save();

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send("User not found!");
      return;
    }

    if (user.isVerified) {
        res.status(400).send("User is already verified!");
        return;
    }

    const verificationToken = chance
      .integer({ min: 100000, max: 999999 })
      .toString();

    const emailInfo = await transport.sendMail({
      from: `"Verify email with token" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Email verification token",
      text: `Here is your verification token: ${verificationToken}`,
      html: `<p style="font-family: sans-serif; font-weight: 700; color: palevioletred">Here is your verification token:</p><h1>${verificationToken}</h1>`,
    });

    const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);

    user.verificationToken = hashedVerificationToken;
    await user.save();

    res.status(200).json({
        user,
        emailInfo,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { email } = req.params;

    await User.findOneAndDelete({ email });

    res.status(200).send("User deleted!");
  } catch (error) {
    next(error);
  }
};
