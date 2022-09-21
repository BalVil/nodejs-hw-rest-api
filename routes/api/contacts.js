const express = require("express");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validator");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", addContactValidation, async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);

    // if (!newContact) {
    //   return res.status(400).json({
    //     message: "missing required name field",
    //   });
    // }

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);

    if (!contact) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.status(200).json({
      message: "contact deleted",
      // contact,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", putContactValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
