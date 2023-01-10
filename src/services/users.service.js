const User = require("../models/User");

exports.createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

exports.findOneByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

exports.deleteUser = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

exports.verifyEmail = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      verificationToken: null,
      isVerified: true,
    },
    {
      new: true,
    }
  );

  return user;
};


/**
 * @param {String} id User id
 * @param {String} verificationToken Hashed email verification token
 */
exports.updateVerificationToken = async (id, verificationToken) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      verificationToken,
      isVerified: false,
    },
    {
      new: true,
    }
  );

  return user;
};
