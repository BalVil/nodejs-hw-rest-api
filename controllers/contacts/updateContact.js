const { Contact } = require("../../models/contactModel");
const { RequestError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
      timestamps: { createdAt: false, updatedAt: true },
    }
  );
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.json(contact);
};

module.exports = updateContact;
