const { Contact } = require("../../models/contactModel");
const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.json({
    message: "contact deleted",
  });
};

module.exports = removeContact;
