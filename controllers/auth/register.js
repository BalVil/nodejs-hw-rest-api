const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { RequestError } = require("../../helpers");
const { User } = require("../../models/userModel");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    email,
    subscription,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL,
    },
  });
};

module.exports = register;
