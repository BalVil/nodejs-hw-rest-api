const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s]{1,25}[a-zA-Z0-9]$/)
    .required()
    .messages({
      "string.base": `name should be a type of string`,
      "string.empty": `name must contain value`,
      "string.pattern.base": `name length should be no less than 2 characters and no more than 25. The name can't start with a number. (letters, numbers and spaces are allowed)`,
      "any.required": `name is a required field`,
    }),
  email: Joi.string()
    .pattern(/^\S+@\S+\.\S+$/)
    .required()
    .messages({
      "string.base": `email should be a type of string`,
      "string.empty": `email must contain value`,
      "string.pattern.base": `email has incorrect format`,
      "any.required": `email is a required field`,
    }),
  phone: Joi.string()
    .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) // eslint-disable-line
    .required()
    .messages({
      "string.base": `phone should be a type of string`,
      "string.empty": `phone must contain value`,
      "string.pattern.base": `phone has incorrect format (Valid formats: (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725)`,
      "any.required": `phone is a required field`,
    }),
}).required();

const statusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "string.base": `favorite should be a type of boolean`,
    "string.empty": `favorite must contain value`,
    "any.required": `favorite is a required field`,
  }),
});

module.exports = {
  addSchema,
  statusSchema,
};
