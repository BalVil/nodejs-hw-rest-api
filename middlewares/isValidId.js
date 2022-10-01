const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../helpers");

// without reversing validity mongoose throws error without status
const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(RequestError(400, `${contactId} is not correct`));
  }
  next();
};

module.exports = isValidId;
