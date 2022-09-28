// const fs = require("fs/promises");
const { Contact } = require("../models/contactModel");

// const path = require("path");
// const absolutePath = path.join(__dirname, "contacts.json");

// const updateContactList = async (data) =>
//   await fs.writeFile(absolutePath, JSON.stringify(data, null, 2));

const listContacts = async () => {
  return await Contact.find();
  // const data = await fs.readFile(absolutePath);
  // return JSON.parse(data);
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);

  // const data = await listContacts();
  // const contact = data.find((item) => item.id === contactId);
  // return contact || null;
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);

  // const data = await listContacts();
  // const idx = data.findIndex((item) => item.id === contactId);
  // if (idx === -1) {
  //   return null;
  // }

  // const [contact] = data.splice(idx, 1);
  // await updateContactList(data);

  // return contact;
};

const addContact = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  return await contact.save();

  // const data = await listContacts();
  // const lastContactId = data[data.length - 1]?.id;
  // const id = data.length ? (Number(lastContactId) + 1).toString() : "1";
  // const newContact = { id, ...body };
  // data.push(newContact);
  // await updateContactList(data);
  // return newContact;
};

const updateContact = async (id, ...body) => {
  return await Contact.findByIdAndUpdate(id, ...body, { new: true });
  // const data = await listContacts();
  // const idx = data.findIndex((item) => item.id === id);
  // if (idx === -1) {
  //   return null;
  // }

  // data[idx] = { id, name, email, phone };
  // await updateContactList(data);

  // return data[idx];
};

const updateStatusContact = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
