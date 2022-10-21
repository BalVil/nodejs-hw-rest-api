const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: process.env.SENDGRID_FROM };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
