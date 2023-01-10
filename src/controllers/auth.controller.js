const jwt = require("jsonwebtoken");

const usersService = require("../services/users.service");
const verificationService = require("../services/verification.service");

exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await usersService.findOneByEmail(email);

    if (existingUser) {
      res.status(400).send("Email already in use!");
      return;
    }

    const { verificationToken, hashedVerificationToken } =
      await verificationService.generateToken();

    const emailInfo = await verificationService.sendVerificationEmail(
      email,
      verificationToken
    );

    const user = await usersService.createUser({
      email,
      verificationToken: hashedVerificationToken,
    });

    const authToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      user,
      emailInfo,
      authToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const { email } = req.user;

    const user = await usersService.findOneByEmail(email);

    if (!user) {
      res.status(404).send("User not found!");
      return;
    }

    const isTokenValid = await verificationService.validateVerificationToken(
      verificationToken,
      user.verificationToken
    );

    if (!isTokenValid) {
      res.status(401).send("Invalid verification token!");
      return;
    }

    const verifiedUser = await usersService.verifyEmail(user._id);

    res.status(200).json({
      verifiedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.resendVerification = async (req, res, next) => {
  try {
    const { email } = req.user;

    const user = await usersService.findOneByEmail(email);

    if (!user) {
      res.status(404).send("User not found!");
      return;
    }

    if (user.isVerified) {
      res.status(400).send("User is already verified!");
      return;
    }

    const { verificationToken, hashedVerificationToken } =
      await verificationService.generateToken();

    const emailInfo = await verificationService.sendVerificationEmail(
      email,
      verificationToken
    );

    const updatedUser = await usersService.updateVerificationToken(
      user._id,
      hashedVerificationToken
    );

    res.status(200).json({
      updatedUser,
      emailInfo,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (req.user.email !== email) {
      res.status(401).send("Unauthorized!");
      return;
    }

    const user = await usersService.findOneByEmail(email);
    if (!user) {
      res.status(404).send("Email not found!");
      return;
    }

    await usersService.deleteUser(user._id);

    res.status(200).send("User deleted!");
  } catch (error) {
    next(error);
  }
};
