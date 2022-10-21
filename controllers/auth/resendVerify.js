const { User } = require("../../models/userModel");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, `No user with email: ${email} found`);
  }

  if (!user.verify) {
    const mail = createVerifyEmail(email, user.verificationToken);
    await sendEmail(mail);

    res.json({
      message: "Verification email sent",
    });
  } else {
    throw RequestError(400, `Verification has already been passed`);
  }
};

module.exports = resendVerify;
