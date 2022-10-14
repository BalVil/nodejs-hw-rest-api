const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s]{1,25}[a-zA-Z0-9]$/)
    .required()
    .messages({
      "string.base": `{{#label}} should be a type of string`,
      "string.empty": `{{#label}} must contain value`,
      "string.pattern.base": `{{#label}} length should be no less than 2 characters and no more than 25. The name can't start with a number. (letters, numbers and spaces are allowed)`,
      "any.required": `{{#label}} is a required field`,
    }),
  email: Joi.string()
    .pattern(/^\S+@\S+\.\S+$/)
    .required()
    .messages({
      "string.base": `{{#label}} should be a type of string`,
      "string.empty": `{{#label}} must contain value`,
      "string.pattern.base": `{{#label}} has incorrect format`,
      "any.required": `{{#label}} is a required field`,
    }),
  phone: Joi.string()
    .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) // eslint-disable-line
    .required()
    .messages({
      "string.base": `{{#label}} should be a type of string`,
      "string.empty": `{{#label}} must contain value`,
      "string.pattern.base": `{{#label}} has incorrect format (Valid formats: (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725)`,
      "any.required": `{{#label}} is a required field`,
    }),
  favorite: Joi.boolean().messages({
    "string.base": `{{#label}} should be a type of boolean`,
    "string.empty": `{{#label}} must contain value`,
  }),
}).required();

const statusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "string.base": `{{#label}} should be a type of boolean`,
    "string.empty": `{{#label}} must contain value`,
    "any.required": `{{#label}} is a required field`,
  }),
});

const schemas = {
  addSchema,
  statusSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
