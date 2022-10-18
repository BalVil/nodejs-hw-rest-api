const { Contact } = require("../../models/contactModel");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const listOfContacts = await Contact.find(
    favorite ? { owner, favorite: true } : { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");
  res.json(listOfContacts);
};

module.exports = listContacts;
