const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.updateContact(contactId, req.body);
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.json(contact);
};

module.exports = updateContact;
