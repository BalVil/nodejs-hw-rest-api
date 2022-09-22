const contacts = require("../../models/contacts");

const addContact = async (req, res) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

module.exports = addContact;
