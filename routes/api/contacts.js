const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contactModel");
const { authenticate } = require("../../middlewares");

router.use(authenticate);

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.statusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
