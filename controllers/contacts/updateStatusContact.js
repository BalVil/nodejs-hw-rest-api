const { Contact } = require("../../models/contactModel");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.json(contact);
};

module.exports = updateStatusContact;
