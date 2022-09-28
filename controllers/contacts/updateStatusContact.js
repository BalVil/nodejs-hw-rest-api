const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!req.body) {
    throw RequestError(400, "missing field favorite");
  }

  const contact = await contacts.updateStatusContact(contactId, favorite);
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.json(contact);
};

module.exports = updateStatusContact;
