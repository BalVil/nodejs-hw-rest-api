const { Contact } = require("../../models/contactModel");

const listContacts = async (_, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt -__v");
  res.json(result);
};

module.exports = listContacts;
