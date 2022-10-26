const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click on this link to confirm the registration</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
