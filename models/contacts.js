const fs = require("fs/promises");

const path = require("path");
const absolutePath = path.join(__dirname, "contacts.json");

const updateContactList = async (data) =>
  await fs.writeFile(absolutePath, JSON.stringify(data, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(absolutePath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  const [contact] = data.splice(idx, 1);
  await updateContactList(data);

  return contact;
};

const addContact = async (body) => {
  const data = await listContacts();

  const lastContactId = data[data.length - 1]?.id;
  const id = data.length ? (Number(lastContactId) + 1).toString() : "1";

  const newContact = { id, ...body };
  data.push(newContact);

  await updateContactList(data);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  // await updateContactList(data);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
