const { Contact } = require("../../models/contactModel");
const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    owner,
  });
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.json({
    message: "contact deleted",
  });
};

module.exports = removeContact;
